import { useDisclosure } from '@ahhachul/lib'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { Emergency, Environment } from '../domain/complaint'
import PageTemplate from '../public/PageTemplate'

const FloatingButton = dynamic(() => import('@/components/public/floats/FloatingBtn'), {
  ssr: false,
})
const CallCenterDrawer = dynamic(
  () => import('@/components/domain/complaint/drawer/callCenterDrawer/CallCenterDrawer'),
  {
    ssr: false,
  }
)

const ComplaintMainScreen = () => {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  return (
    <PageTemplate>
      <PageTemplate.ContentsSection>
        <Container>
          <Environment />
          <Emergency />
        </Container>
      </PageTemplate.ContentsSection>

      <PageTemplate.ModalOrFloatingContents>
        <FloatingButton label="콜센터 신고" onClick={onOpen} />
        <CallCenterDrawer ref={dialogRef} isOpen={isOpen} onClose={onClose} />
      </PageTemplate.ModalOrFloatingContents>
    </PageTemplate>
  )
}

const Container = styled.section`
  padding: 20px 16px;
`

export default ComplaintMainScreen
