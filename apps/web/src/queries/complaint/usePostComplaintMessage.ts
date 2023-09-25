import { useMutation } from '@tanstack/react-query'

import { ComplaintMessageRequest } from '@/types/complaint'
import complaintAPI from '@/apis/complaint'

export const usePostComplaintMessage = () => {
  return useMutation({
    mutationFn: ({ params }: { params: ComplaintMessageRequest }) => complaintAPI.fetchPostComplaintMessage(params),
  })
}
