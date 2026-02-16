import { useCallback } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { validateRequiredLexicalContent } from '@ahhachul/utils';

type WithContent = {
  content: string | null;
};

interface UseLexicalValidatedSubmitOptions<TForm extends FieldValues & WithContent> {
  methods: UseFormReturn<TForm>;
  onValidSubmit: (data: TForm) => void;
  requiredMessage?: string;
}

export const useLexicalValidatedSubmit = <TForm extends FieldValues & WithContent>({
  methods,
  onValidSubmit,
  requiredMessage = '내용을 입력해주세요',
}: UseLexicalValidatedSubmitOptions<TForm>) => {
  const validateContent = useCallback(
    (content: string | null | undefined): boolean => {
      const validation = validateRequiredLexicalContent(content, { requiredMessage });
      if (!validation.isValid) {
        methods.setError('content' as Path<TForm>, {
          type: 'required',
          message: validation.message,
        });
        return false;
      }

      return true;
    },
    [methods, requiredMessage],
  );

  const onSubmit = useCallback(
    (data: TForm) => {
      if (!validateContent(data.content)) return;
      onValidSubmit(data);
    },
    [onValidSubmit, validateContent],
  );

  const onError = useCallback(() => {
    const contentValue = methods.getValues('content' as Path<TForm>);
    validateContent(typeof contentValue === 'string' ? contentValue : null);
  }, [methods, validateContent]);

  return {
    validateContent,
    submit: methods.handleSubmit(onSubmit, onError),
  };
};
