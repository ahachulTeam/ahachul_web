import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Header } from '@/components/public/header'

export default function LostGenerateHeader() {
  const router = useRouter()

  const title = useMemo(() => {
    if (router.query.tab === 'lost') {
      return '분실물 작성'
    }
    return '습득물 작성'
  }, [router.query.tab])

  return (
    <Header hasGoBack title={title}>
      <Header.TempSave isDisabled onClick={() => console.log('임시 저장')} />
    </Header>
  )
}
