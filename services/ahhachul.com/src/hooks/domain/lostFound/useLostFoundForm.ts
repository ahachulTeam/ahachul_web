import { useForm } from 'react-hook-form';

import { useCreateLostFound } from '@/services/lostFound';
import { type LostFoundForm, LostFoundType } from '@/types';
import { validateLexicalContent } from '@/utils/lexical';

const useLostFoundForm = () => {
  const { control, register, setValue, setError, getValues, handleSubmit, watch } =
    useForm<LostFoundForm>({
      mode: 'onBlur',
      defaultValues: {
        title: '',
        content: '',
        images: [],
        subwayLineId: 1,
        lostType: LostFoundType.LOST,
      },
    });

  const { mutate: createLostArticle, isPending } = useCreateLostFound();

  const title = watch('title');
  const content = watch('content');

  const isEmpty = (value: string) => value.trim() === '';

  const isDisabled = isEmpty(title) || isEmpty(content) || isPending;

  const onError = () => {
    if (!validateLexicalContent(getValues('content'), setError)) return;
  };

  const onSubmit = (data: LostFoundForm) => {
    if (!validateLexicalContent(data.content, setError)) return;

    createLostArticle(data);
  };

  const submit = handleSubmit(onSubmit, onError);

  return {
    control,
    isPending,
    isDisabled,
    register,
    setValue,
    setError,
    getValues,
    submit,
  };
};

export default useLostFoundForm;
