import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { Header } from '@/components/public/layout'

const ComplaintContentsKeys = {
  facilities: '시설 · 환경민원',
  temperature: '온도조절',
  announcement: '안내방송',
  impediment: '질서저해',
  patient: '응급환자',
  sexual: '성추행',
  violence: '폭력',
}

export const ComplaintGenerateHeader = () => {
  const router = useRouter()

  const selectedComplaint = useMemo(() => {
    return router.query.id as keyof typeof ComplaintContentsKeys
  }, [router.query])

  return <Header hasGoBack hasBorder={false} title={ComplaintContentsKeys[selectedComplaint]} />
}
