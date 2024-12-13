import { useEffect, useState } from 'react';

const MAX_IMAGE_LENGTH = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type Image = {
  id: number | null;
  data: File | null;
  url: string;
};

export const useDetailImage = (initialImages: Image[]) => {
  const [images, setImages] = useState<Image[]>([]);
  const [removeImageIds, setRemoveImageIds] = useState<number[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_IMAGE_LENGTH) {
      alert(`이미지는 최대 ${MAX_IMAGE_LENGTH}장까지 등록됩니다.`);
      return;
    }

    const fileBlob = e.target.files?.[0];
    if (!fileBlob) return;
    if (fileBlob.size > MAX_FILE_SIZE) {
      alert(
        `파일 용량은 최대 ${MAX_FILE_SIZE / 1024 / 1024}MB까지 허용됩니다.`,
      );
      return;
    }

    const fileUrl = URL.createObjectURL(fileBlob);
    setImages((prev) => [...prev, { id: null, data: fileBlob, url: fileUrl }]);
    e.target.value = '';
  };

  const onDeleteImage = (index: number) => {
    const targetImageId = images[index].id;
    if (targetImageId !== null) {
      setRemoveImageIds((prev) => [...prev, targetImageId]);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (initialImages) {
      setImages(initialImages);
    }
  }, [initialImages]);

  return { images, removeImageIds, handleFileChange, onDeleteImage };
};
