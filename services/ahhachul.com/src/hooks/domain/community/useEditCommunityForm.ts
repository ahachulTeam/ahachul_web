import { useEditCommunity } from '@/services/community';
import type { CommunityEditForm, CommunityType } from '@/types';

import {
  MAX_POST_IMAGE_COUNT,
  communityEditFormSchema,
  useEditPostImageHandlers,
  useLexicalValidatedSubmit,
  useSchemaForm,
} from '../form';

const useEditCommunityForm = (
  id: number,
  categoryType: CommunityType,
  defaultValues: CommunityEditForm,
) => {
  const { mutate: updateCommunityArticle, isPending } = useEditCommunity(id, categoryType);

  const methods = useSchemaForm<CommunityEditForm>({
    schema: communityEditFormSchema,
    defaultValues,
  });

  const { handleImageUpload, handleImageDelete } = useEditPostImageHandlers(
    methods,
    MAX_POST_IMAGE_COUNT,
  );
  const { submit } = useLexicalValidatedSubmit({
    methods,
    onValidSubmit: updateCommunityArticle,
  });

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit,
  };
};

export default useEditCommunityForm;
