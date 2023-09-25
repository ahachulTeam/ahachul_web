import { useMutation } from '@tanstack/react-query'

import complaintAPI from '@/apis/complaint'
import { ComplaintMessageRequest } from '@/types/complaint'

export const usePostComplaintMessage = () => {
  return useMutation({
    mutationFn: ({ params }: { params: ComplaintMessageRequest }) => complaintAPI.fetchPostComplaintMessage(params),
  })
}
