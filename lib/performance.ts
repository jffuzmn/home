// Performance utilities for runtime optimizations

import { useCallback, useRef, useMemo, useState, useEffect } from 'react'

/**
 * Debounce hook for performance optimization
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay)
    }) as T,
    [callback, delay]
  )
}

/**
 * Throttle hook for performance optimization
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0)

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = now
      }
    }) as T,
    [callback, delay]
  )
}

/**
 * Memoize expensive calculations
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps)
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string = 'fetch'): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (as === 'font') {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  }
}

/**
 * Lazy load images with intersection observer
 */
export function useLazyImage(src: string): [string | null, boolean] {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [src])

  useEffect(() => {
    if (imageSrc) {
      const img = new Image()
      img.onload = () => setIsLoaded(true)
      img.src = imageSrc
    }
  }, [imageSrc])

  return [imageSrc, isLoaded]
}

/**
 * Performance measurement utility
 */
export function measurePerformance(name: string) {
  return {
    start: () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        performance.mark(`${name}-start`)
      }
    },
    end: () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        performance.mark(`${name}-end`)
        performance.measure(name, `${name}-start`, `${name}-end`)
      }
    }
  }
}