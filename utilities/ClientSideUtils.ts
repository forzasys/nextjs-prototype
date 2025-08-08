'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
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

    router.push(`?${params.toString()}`, { scroll: false });
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

    router.push(`?${params.toString()}`, { scroll: false });
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
  // Start with null to avoid time-based differences during SSR vs client hydration
  const [remainingTime, setRemainingTime] = useState<number | null>(null)

  useEffect(() => {
    // Initialize on mount and then tick every second
    const update = () => setRemainingTime(calculateRemainingTime(time))
    update()

    const countdown = setInterval(() => {
      const timeLeft = calculateRemainingTime(time)
      setRemainingTime(timeLeft)
      if (timeLeft !== null && timeLeft <= 0) {
        clearInterval(countdown)
      }
    }, 1000)

    return () => clearInterval(countdown)
  }, [time])

  // While hydrating or if time is invalid, show stable placeholders
  if (remainingTime === null) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

  const daysStr = days.toString().length === 1 ? `0${days}` : days.toString()
  const hoursStr = hours.toString().length === 1 ? `0${hours}` : hours.toString()
  const minutesStr = minutes.toString().length === 1 ? `0${minutes}` : minutes.toString()
  const secondsStr = seconds.toString().length === 1 ? `0${seconds}` : seconds.toString()

  return { days: daysStr, hours: hoursStr, minutes: minutesStr, seconds: secondsStr }
}

type AllowedPointer = 'mouse' | 'all'

interface UseDragToScrollOptions {
  pointerType?: AllowedPointer
  clickPreventThreshold?: number
  snap?: boolean
  snapSelector?: string
  snapBehavior?: ScrollBehavior
  snapAlignment?: 'start' | 'center'
  snapOnScrollEnd?: boolean
  scrollEndDebounceMs?: number
  ignoreInteractive?: boolean
}

export function useDragToScroll<TElement extends HTMLElement = HTMLDivElement>(options?: UseDragToScrollOptions) {
  const {
    pointerType = 'mouse',
    clickPreventThreshold = 3,
    snap = false,
    snapSelector,
    snapBehavior = 'smooth',
    snapAlignment = 'start',
    snapOnScrollEnd = true,
    scrollEndDebounceMs = 150,
    ignoreInteractive = true,
  } = options || {}

  const containerRef = useRef<TElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const startXRef = useRef<number>(0)
  const startScrollLeftRef = useRef<number>(0)
  const hasDraggedRef = useRef<boolean>(false)
  const scrollEndTimeoutRef = useRef<number | null>(null)
  const startedOnInteractiveRef = useRef<boolean>(false)

  const snapToNearest = useCallback((container: TElement) => {
    if (!snap) return
    const containerRect = container.getBoundingClientRect()
    const styles = getComputedStyle(container)
    const paddingLeft = parseFloat(styles.paddingLeft || '0') || 0
    const paddingRight = parseFloat(styles.paddingRight || '0') || 0

    const children: HTMLElement[] = snapSelector
      ? Array.from(container.querySelectorAll<HTMLElement>(snapSelector))
      : (Array.from(container.children) as HTMLElement[])

    if (children.length === 0) return

    const currentLeft = container.scrollLeft
    let nearestX: { target: number; distance: number } | null = null
    for (const el of children) {
      const elRect = el.getBoundingClientRect()
      const targetStart = currentLeft + (elRect.left - (containerRect.left + paddingLeft))
      const targetCenter = currentLeft + (
        elRect.left + elRect.width / 2 - (containerRect.left + paddingLeft + (container.clientWidth - paddingLeft - paddingRight) / 2)
      )
      const target = snapAlignment === 'center' ? targetCenter : targetStart
      const distance = Math.abs(target - currentLeft)
      if (!nearestX || distance < nearestX.distance) {
        nearestX = { target, distance }
      }
    }
    if (nearestX) {
      container.scrollTo({ left: nearestX.target, behavior: snapBehavior })
    }
  }, [snap, snapSelector, snapAlignment, snapBehavior])

  const isPointerAllowed = (event: React.PointerEvent) => {
    if (pointerType === 'all') return true
    return event.pointerType === 'mouse'
  }

  const onPointerDown = (event: React.PointerEvent<TElement>) => {
    if (!isPointerAllowed(event)) return
    const container = containerRef.current
    if (!container) return

    // Skip starting a drag when interacting with links/buttons/inputs
    if (ignoreInteractive) {
      const target = event.target as HTMLElement
      const interactiveAncestor = target.closest(
        'a, button, input, textarea, select, [contenteditable="true"], [data-no-drag]'
      )
      if (interactiveAncestor) {
        startedOnInteractiveRef.current = true
        return
      }
    }

    startedOnInteractiveRef.current = false
    isDraggingRef.current = true
    startXRef.current = event.clientX
    startScrollLeftRef.current = container.scrollLeft
    hasDraggedRef.current = false
    // Note: add 'dragging' class only after surpassing threshold in onPointerMove
    try { container.setPointerCapture(event.pointerId) } catch {}
  }

  const onPointerMove = (event: React.PointerEvent<TElement>) => {
    if (!isPointerAllowed(event)) return
    if (!isDraggingRef.current) return
    const container = containerRef.current
    if (!container) return
    const deltaX = event.clientX - startXRef.current
    if (Math.abs(deltaX) > clickPreventThreshold) {
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true
        container.classList.add('dragging')
      }
      container.scrollLeft = startScrollLeftRef.current - deltaX
    }
  }

  const endPointerDrag = (event: React.PointerEvent<TElement>) => {
    if (!isPointerAllowed(event)) return
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const container = containerRef.current
    if (container) {
      container.classList.remove('dragging')
      try { container.releasePointerCapture(event.pointerId) } catch {}
    }

    // Snap to nearest child after drag end
    if (snap && hasDraggedRef.current && container) {
      snapToNearest(container)
    }
    setTimeout(() => { hasDraggedRef.current = false; startedOnInteractiveRef.current = false }, 0)
  }

  // Snap after inertial/native scroll ends (works for mouse wheel, trackpad, touch flicks)
  useEffect(() => {
    const container = containerRef.current
    if (!container || !snap || !snapOnScrollEnd) return

    const onScroll = () => {
      if (isDraggingRef.current) return
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current)
      scrollEndTimeoutRef.current = window.setTimeout(() => {
        snapToNearest(container)
      }, scrollEndDebounceMs)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current)
    }
  }, [snap, snapOnScrollEnd, scrollEndDebounceMs, snapToNearest])

  const onClickCapture = (event: React.MouseEvent<TElement>) => {
    // Always allow clicks that started on interactive elements (e.g., Links)
    if (startedOnInteractiveRef.current) {
      startedOnInteractiveRef.current = false
      return
    }
    // Prevent accidental clicks only if a drag actually occurred
    if (hasDraggedRef.current) {
      event.preventDefault()
      event.stopPropagation()
      hasDraggedRef.current = false
    }
  }

  return {
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp: endPointerDrag,
    onPointerCancel: endPointerDrag,
    onPointerLeave: endPointerDrag,
    onClickCapture,
  }
}