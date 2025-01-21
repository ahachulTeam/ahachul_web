import { Controller, type Path, type FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent } from '@/components';

import { ImageUploadMolecules } from '../../molecules';

interface ImageUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
<<<<<<< HEAD
  label: string;
=======
>>>>>>> main
  onImgChange: (files: File[]) => void;
  onDeleteImg: (index: number) => void;
}

const ImageUploadField = <T extends FieldValues>({
  name,
<<<<<<< HEAD
  label,
=======
>>>>>>> main
  onImgChange,
  onDeleteImg,
}: ImageUploadFieldProps<T>) => {
  const { control } = useFormContext<T>();

  const handleChange = (files: File[]) => {
    onImgChange?.(files);
  };

  const handleDelete = (index: number) => {
    onDeleteImg(index);
  };

  return (
    <FormComponent.FormSection>
      <div>
<<<<<<< HEAD
        <p>{label}</p>
=======
        <p>유실물 상세정보</p>
>>>>>>> main
      </div>
      <Controller
        name={name}
        render={({ field }) => (
          <ImageUploadMolecules
            hasPreview
            images={(field.value as File[]) || []}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        )}
        control={control}
      />
    </FormComponent.FormSection>
  );
};

export default ImageUploadField;
