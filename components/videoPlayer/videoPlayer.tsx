'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import videojs from 'video.js';
import type { PlaylistType } from '@/types/dataTypes';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import './videoPlayer.css';

// Define props interface
type VideoPlayerType = {
  autoplay?: boolean;
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  source: {
    src: string;
    type: string;
  };
  poster?: string;
  liveui?: boolean;
  fill?: boolean;
  preload?: string;
  controlBar?: {
    playToggle: {
      replay: boolean;
    };
  };
}

interface VideoPlayerProps {
  playlist: PlaylistType;
  onReady?: (player: Player) => void;
}

function VideoPlayer({ playlist, onReady }: VideoPlayerProps) {

    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);

    const poster = playlist.hd_thumbnail_url || playlist.thumbnail_url

    const options: VideoPlayerType = useMemo(() => {
        return {
            autoplay: false,
            controls: true,
            responsive: true,
            liveui: true,
            fill: true,
            poster: poster,
            preload: "auto",
            source: {
                src: playlist.video_url,
                type: "application/x-mpegurl" // HLS stream format
            },
            controlBar: {
                playToggle: {
                    replay: false
                }
            }
        };
    }, [playlist.video_url, poster])

    useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
        if (!videoRef.current) return;
        
        // Validate playback URL
        if (!playlist.video_url) {
            console.error('No playback URL provided');
            return;
        }
        
        // Initialize video.js player
        const videoElement = document.createElement('video-js');
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current.appendChild(videoElement);
        
        try {
            const player = playerRef.current = videojs(videoElement, {
                ...options,
                sources: [options.source] // Ensure source is passed correctly
            }, () => {
                console.log('Player Ready');
                // Call onReady callback if provided
                if (onReady) onReady(player);
            });
            
            // Add error handler
            player.on('error', () => {
                console.error('Video.js Error:', player.error());
            });
        } catch (error) {
            console.error('Failed to initialize player:', error);
        }
        } else {
        const player = playerRef.current;
        console.log('Updating player source to:', options.source);
        player.src([options.source]);
        
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, videoRef]);

    // Dispose the Video.js player when the component unmounts
    useEffect(() => {
        return () => {
        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }
        };
    }, []);

    return (
        <div>
            <div ref={videoRef} className="video-player" />
        </div>
    );
};

export default VideoPlayer;