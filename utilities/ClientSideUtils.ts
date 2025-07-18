'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Single parameter update 
  const updateParam = (param: string, value?: string | number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined) {
      params.delete(param);
    } else {
      params.set(param, String(value));
    }

    router.push(`?${params.toString()}`);
  };

  // Handles multiple parameter updates
  const updateMultipleParams = (updates: { param: string; value?: string | number | undefined }[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    updates.forEach(({ param, value }) => {
      if (value === undefined) {
        params.delete(param);
      } else {
        params.set(param, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  return {
    updateParam,
    updateMultipleParams
  };
};

export function calculateRemainingTime (time: string) {
  if (!time) return null
  const remaining = new Date(time).getTime() - new Date().getTime()
  if (remaining < 0) return 0
  else return remaining
}

export function useCountDown (time: string) {
    
  const [remainingTime, setRemainingTime] = useState(() => calculateRemainingTime(time))

  useEffect(() => {
      setRemainingTime(calculateRemainingTime(time))
      const countdown = setInterval(() => {
          const timeLeft = calculateRemainingTime(time)
          setRemainingTime(timeLeft)
          if (timeLeft && timeLeft <= 0){
              clearInterval(countdown)
          } 
      }, 1000)
      return () => clearInterval(countdown)
  }, [time])

  if (!remainingTime) return {}

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

  const daysStr = days.toString().length === 1 ? `0${days}` : days.toString()
  const hoursStr = hours.toString().length === 1 ? `0${hours}` : hours.toString()
  const minutesStr = minutes.toString().length === 1 ? `0${minutes}` : minutes.toString()
  const secondsStr = seconds.toString().length === 1 ? `0${seconds}` : seconds.toString()

  return {days: daysStr, hours: hoursStr, minutes: minutesStr, seconds: secondsStr}
}