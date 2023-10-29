import { useEffect, useState } from 'react'

export const useNavigationBar = () => {
  const [isOpenNavigationBar, setIsOpenNavigationBar] = useState(false)

  const updateScroll = () => {
    const element = document.getElementById('navigation-bar')

    if (!element || !element.dataset.show) {
      return
    }

    setIsOpenNavigationBar(JSON.parse(element.dataset.show))
  }

  useEffect(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { capture: true, passive: true })

    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return { isOpenNavigationBar }
}
