import { useDisclosure } from '@ahhachul/lib'
import { type ReactElement } from 'react'

import { useFilterModalBoolean } from '@/atoms/modal'
import { FloatingButton, Layout } from '@/components'
import { CallCenterDrawer, ComplaintHeader, ComplaintPageContainer } from '@/components/domain/complaint'
import ComplaintDrawer from '@/components/domain/complaint/drawer/complaintDrawer/ComplaintDrawer'

export default function ComplaintPage() {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  const [modalState, toggleShowing, _, onComplaintModalClose] = useFilterModalBoolean()

  return (
    <>
      <ComplaintPageContainer toggleShowing={toggleShowing} />
      <FloatingButton label="콜센터 신고" onClick={onOpen} />
      <CallCenterDrawer ref={dialogRef} isOpen={isOpen} onClose={onClose} />
      <ComplaintDrawer
        isOpen={modalState.isOpen}
        targetSection={modalState.targetSection}
        onClose={onComplaintModalClose}
      />
    </>
  )
}

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintHeader />}>{page}</Layout>
}
