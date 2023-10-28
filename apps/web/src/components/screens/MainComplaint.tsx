import { useDisclosure } from '@ahhachul/lib'
import styled from '@emotion/styled'
import { Emergency, Environment } from '../domain/complaint'
import PageTemplate from '../public/PageTemplate'
import { FloatingButton } from '@/components'
import { CallCenterDrawer } from '@/components/domain/complaint'

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
