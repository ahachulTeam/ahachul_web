import { useEditLostFound } from '@/services/lostFound';
import type { LostFoundType, LostFoundEditForm } from '@/types';

import {
  MAX_POST_IMAGE_COUNT,
  lostFoundEditFormSchema,
  useEditPostImageHandlers,
  useLexicalValidatedSubmit,
  useSchemaForm,
} from '../form';

const useEditLostFoundForm = (
  id: number,
  lostType: LostFoundType,
  defaultValues: LostFoundEditForm,
) => {
  const { mutate: updateLostArticle, isPending } = useEditLostFound(id, lostType);

  const methods = useSchemaForm<LostFoundEditForm>({
    schema: lostFoundEditFormSchema,
    defaultValues,
  });

  const { handleImageUpload, handleImageDelete } = useEditPostImageHandlers(
    methods,
    MAX_POST_IMAGE_COUNT,
  );
  const { submit } = useLexicalValidatedSubmit({
    methods,
    onValidSubmit: updateLostArticle,
  });

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit,
  };
};

export default useEditLostFoundForm;
