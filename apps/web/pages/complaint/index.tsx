import { useDisclosure } from '@ahhachul/lib'
import { type ReactElement } from 'react'

import { Layout } from '@/components'
import { CallCenterDrawer, ComplaintHeader, ComplaintPageContainer } from '@/components/domain/complaint'

export default function ComplaintPage() {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ComplaintPageContainer />
      {/* <FloatingButton label="콜센터 신고" onClick={onOpen} /> */}
      <CallCenterDrawer ref={dialogRef} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintHeader />}>{page}</Layout>
}
