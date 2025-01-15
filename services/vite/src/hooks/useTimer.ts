import { useState, useEffect, useCallback } from 'react'

interface UseTimerProps {
  initialSeconds: number
  onEnd?: () => void
}

const useTimer = ({ initialSeconds, onEnd }: UseTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const start = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(true)
  }, [initialSeconds])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          onEnd?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, onEnd])

  const formatTime = useCallback(() => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [seconds])

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    formatTime,
  }
}

export default useTimer
