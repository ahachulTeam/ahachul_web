import { objectKeys } from '@ahhachul/utils';

import { complaintsContentDetail } from '@/constants';
import { useCreateComplaint } from '@/services/complaint';
import { KeyOf } from '@/types';
import type { ComplaintForm } from '@/types/complaint';

import {
  MAX_POST_IMAGE_COUNT,
  complaintFormSchema,
  useCreatePostImageHandlers,
  useLexicalValidatedSubmit,
  useSchemaForm,
} from '../form';

const useComplaintForm = (slug: KeyOf<typeof complaintsContentDetail>) => {
  const { mutate: createComplaintArticle, isPending } = useCreateComplaint();
  const normalizedSlug = complaintsContentDetail[slug] ? slug : 'ENVIRONMENTAL_COMPLAINT';
  const complaintDetail = complaintsContentDetail[normalizedSlug];

  const methods = useSchemaForm<ComplaintForm>({
    schema: complaintFormSchema,
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: '1',
      stationId: '0',
      complaintType: normalizedSlug,
      shortContentType: objectKeys(complaintDetail.selectList)[0],
    },
  });

  const { handleImageUpload, handleImageDelete } = useCreatePostImageHandlers(
    methods,
    MAX_POST_IMAGE_COUNT,
  );
  const { submit } = useLexicalValidatedSubmit({
    methods,
    onValidSubmit: createComplaintArticle,
  });

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit,
  };
};

export default useComplaintForm;
