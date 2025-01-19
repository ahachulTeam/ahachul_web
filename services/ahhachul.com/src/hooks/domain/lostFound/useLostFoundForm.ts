import { useForm } from 'react-hook-form';

import { useCreateLostFound } from '@/services/lostFound';
import { type LostFoundForm, LostFoundType } from '@/types';
import { validateLexicalContent } from '@/utils/lexical';

const useLostFoundForm = () => {
  const { control, register, setValue, setError, getValues, handleSubmit } = useForm<LostFoundForm>(
    {
      mode: 'onBlur',
      defaultValues: {
        title: '',
        content: '',
        images: [],
        subwayLineId: 1,
        lostType: LostFoundType.LOST,
      },
    },
  );

  const { mutate: createLostArticle, isPending } = useCreateLostFound();

  const onError = () => {
    if (!validateLexicalContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: LostFoundForm) => {
    if (!validateLexicalContent(data.content, setError)) return;

    createLostArticle(data);
  };

  return {
    control,
    isPending,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    onSubmit,
    onError,
  };
};

export default useLostFoundForm;
