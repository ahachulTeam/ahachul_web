import { Header } from '@/components/layout'

export const CommunityGenerateHeader = () => {
  return (
    <Header title="게시글 작성" hasGoBack>
      <Header.TempSave onClick={() => console.log('share')} />
    </Header>
  )
}
