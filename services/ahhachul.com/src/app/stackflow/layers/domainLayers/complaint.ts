import React from 'react';

const Complaint = React.lazy(() => import('pages/complaint/ui/Page/Page'));
const ComplaintDetail = React.lazy(
  () => import('pages/complaint/ui/Page/Detail'),
);
const CreateComplaintArticle = React.lazy(
  () => import('pages/complaint/ui/Page/Create'),
);
const ComplaintForm = React.lazy(
  () => import('pages/complaint/ui/Page/ComplaintForm'),
);

export const complaintLayers = {
  Complaint,
  ComplaintDetail,
  CreateComplaintArticle,
  ComplaintForm,
  // ComplaintDetail,
  // AskTrainNumber: ComplaintsComponent.AskTrainNumber,
  // ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
};
