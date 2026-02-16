import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Mode,
  type UseFormReturn,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

interface UseSchemaFormOptions<TForm extends FieldValues> {
  schema: z.ZodType<TForm>;
  defaultValues: DefaultValues<TForm>;
  mode?: Mode;
}

export const useSchemaForm = <TForm extends FieldValues>({
  schema,
  defaultValues,
  mode = 'onBlur',
}: UseSchemaFormOptions<TForm>): UseFormReturn<TForm> => {
  return useForm<TForm>({
    mode,
    resolver: zodResolver(schema),
    defaultValues,
  });
};
