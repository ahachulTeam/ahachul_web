import { useDisclosure } from '@ahhachul/lib'
import { type ReactElement } from 'react'

import { FloatingButton, Layout } from '@/components'
import { CallCenterDrawer, ComplaintHeader, ComplaintPageContainer } from '@/components/domain/complaint'
import ComplaintDrawer from '@/components/domain/complaint/generate/complaintDrawer/ComplaintDrawer'

export default function ComplaintPage() {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ComplaintPageContainer />
      <CallCenterDrawer ref={dialogRef} isOpen={isOpen} onClose={onClose} />
      <FloatingButton label="콜센터 신고" onClick={onOpen} />
    </>
  )
}

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintHeader />}>{page}</Layout>
}
