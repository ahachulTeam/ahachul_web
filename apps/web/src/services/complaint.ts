import { useMutation } from '@tanstack/react-query'
import * as complaintAPI from '@/apis/complaint'
import * as type from '@/types/complaint'

export const usePostComplaintMessage = () => {
  return useMutation({
    mutationFn: ({ params }: { params: type.ComplaintMessageRequest }) =>
      complaintAPI.fetchPostComplaintMessage(params),
  })
}
