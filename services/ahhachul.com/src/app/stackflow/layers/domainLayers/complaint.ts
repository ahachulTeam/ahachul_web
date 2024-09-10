import React from 'react';

const Complaint = React.lazy(() => import('pages/complaint/ui/Page/Page'));
const ComplaintList = React.lazy(() => import('pages/complaint/ui/Page/List'));
const ComplaintDetail = React.lazy(
  () => import('pages/complaint/ui/Page/Detail'),
);
const ComplaintForm = React.lazy(
  () => import('pages/complaint/ui/Page/ComplaintForm'),
);

export const complaintLayers = {
  Complaint,
  ComplaintList,
  ComplaintDetail,
  ComplaintForm,
  // ComplaintDetail,
  // AskTrainNumber: ComplaintsComponent.AskTrainNumber,
  // ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
};
