import React from 'react';

const Complaint = React.lazy(() => import('pages/complaint/ui/Page/Page'));
export const complaintLayers = {
  Complaint,
  // ComplaintDetail,
  // AskTrainNumber: ComplaintsComponent.AskTrainNumber,
  // ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
};
