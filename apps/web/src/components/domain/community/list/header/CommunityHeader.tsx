import { useDisclosure } from '@ahhachul/lib'
import { SearchDrawer } from '@/components/common'
import { Header } from '@/components/layout'

export const CommunityHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header>
        <Header.Search onClick={onOpen} />
        <Header.Alarm />
      </Header>
      <SearchDrawer isMounted={isOpen} onClose={onClose} />
    </>
  )
}
