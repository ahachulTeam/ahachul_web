import { useCreateCommunity } from '@/services/community';
import { CommunityType, type CommunityForm } from '@/types';

import {
  MAX_POST_IMAGE_COUNT,
  communityFormSchema,
  useCreatePostImageHandlers,
  useLexicalValidatedSubmit,
  useSchemaForm,
} from '../form';

const useCommunityForm = () => {
  const { mutate: createCommunity, isPending } = useCreateCommunity();

  const methods = useSchemaForm<CommunityForm>({
    schema: communityFormSchema,
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: 1,
      categoryType: CommunityType.FREE,
    },
  });

  const { handleImageUpload, handleImageDelete } = useCreatePostImageHandlers(
    methods,
    MAX_POST_IMAGE_COUNT,
  );
  const { submit } = useLexicalValidatedSubmit({
    methods,
    onValidSubmit: createCommunity,
  });

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit,
  };
};

export default useCommunityForm;
