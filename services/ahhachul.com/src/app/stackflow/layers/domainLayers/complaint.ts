import React from 'react';

const Complaint = React.lazy(() => import('pages/complaint/ui/Page/Page'));
const ComplaintDetail = React.lazy(
  () => import('pages/complaint/ui/Page/Detail'),
);
export const complaintLayers = {
  Complaint,
  ComplaintDetail,
  // ComplaintDetail,
  // AskTrainNumber: ComplaintsComponent.AskTrainNumber,
  // ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
};
