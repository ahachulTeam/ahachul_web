import { useBoolean } from '@ahhachul/lib'
import { Dialog } from '@/components/common/dialog'
import { Header } from '@/components/public/layout'

export const CommunityGenerateHeader = () => {
  const [isDialogShowing, _, onDialogOpen, onDialogClose] = useBoolean(false)

  const handleDialogAction = () => {
    onDialogClose()
  }

  return (
    <>
      <Header title="게시글 작성" hasGoBack>
        <Header.TempSave onClick={onDialogOpen} />
      </Header>
      <Dialog
        isMounted={isDialogShowing}
        onClickOutside={onDialogClose}
        title={<Dialog.Title>게시물을 임시 저장</Dialog.Title>}
        description={
          <Dialog.Description>{`수정한 내용을 임시 저장하고\n나중에 완료할 수 있습니다`}</Dialog.Description>
        }
        confirmButton={
          <Dialog.ConfirmButton label="임시 저장" variant="primary" size="smd" onClick={handleDialogAction} />
        }
        cancelButton={<Dialog.CancelButton label="취소" variant="ghost" size="smd" onClick={onDialogClose} />}
      />
    </>
  )
}
