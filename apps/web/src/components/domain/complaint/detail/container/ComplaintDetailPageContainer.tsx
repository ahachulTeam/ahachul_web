import { useRouter } from 'next/router'

export const ComplaintDetailPageContainer = () => {
  const {
    query: { id },
  } = useRouter()

  return <div>{id}</div>
}
