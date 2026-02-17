import { useCreateLostFound } from '@/services/lostFound';
import { type LostFoundForm, LostFoundType } from '@/types';

import {
  MAX_POST_IMAGE_COUNT,
  lostFoundFormSchema,
  useCreatePostImageHandlers,
  useLexicalValidatedSubmit,
  useSchemaForm,
} from '../form';

const useLostFoundForm = () => {
  const { mutate: createLostArticle, isPending } = useCreateLostFound();

  const methods = useSchemaForm<LostFoundForm>({
    schema: lostFoundFormSchema,
    defaultValues: {
      title: '',
      content: '',
      images: [],
      subwayLineId: 1,
      lostType: LostFoundType.LOST,
    },
  });

  const { handleImageUpload, handleImageDelete } = useCreatePostImageHandlers(
    methods,
    MAX_POST_IMAGE_COUNT,
  );
  const { submit } = useLexicalValidatedSubmit({
    methods,
    onValidSubmit: createLostArticle,
  });

  return {
    methods,
    isPending,
    handleImageUpload,
    handleImageDelete,
    submit,
  };
};

export default useLostFoundForm;
