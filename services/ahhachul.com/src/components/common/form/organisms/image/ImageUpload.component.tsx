import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { FormComponent } from '@/components';

import { ImageUploadMolecules } from '../../molecules';

interface ImageUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const ImageUploadField = <T extends FieldValues>({ name, control }: ImageUploadFieldProps<T>) => (
  <FormComponent.FormSection>
    <div>
      <p>유실물 상세정보</p>
    </div>
    <Controller
      name={name}
      render={({ field }) => (
        <ImageUploadMolecules
          hasPreview
          images={(field.value as File[]) || []}
          onDelete={(index: number) => {
            const currentImages = (field.value as File[]) || [];
            const newImages = [...currentImages];
            newImages.splice(index, 1);
            field.onChange(newImages);
          }}
          onChange={(files: File[]) => {
            const currentImages = (field.value as File[]) || [];
            const newImages = [...currentImages, ...files].slice(0, 5);
            field.onChange(newImages);
          }}
        />
      )}
      control={control}
    />
  </FormComponent.FormSection>
);

export default ImageUploadField;
