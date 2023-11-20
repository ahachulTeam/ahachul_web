import { useDidMount } from '@ahhachul/lib'
import { PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal({ children }: PropsWithChildren) {
  const [container, setContainer] = useState<Element | null>(null)

  useDidMount(() => {
    if (document) {
      setContainer(document.body)
    }
  })

  if (!container) {
    return null
  }

  return createPortal(children, container)
}
