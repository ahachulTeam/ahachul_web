import { useEffect } from 'react'

interface UseModalEffectProps {
  isOpen: boolean
  onClose: () => void
}

export const useKeyEscape = ({ isOpen, onClose }: UseModalEffectProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
}
