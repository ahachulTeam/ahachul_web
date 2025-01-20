import React, { memo, forwardRef, useCallback } from 'react';

import { PictureIcon, CircleCloseIcon } from '@/assets/icons/system';
import { EditableImage } from '@/types';

import * as S from './ImageUpload.styled';

interface ImageUploadProps {
  hasPreview?: boolean;
  images: EditableImage[] | File[];
  onDelete: (index: number) => void;
  onChange: (files: File[]) => void;
}

const ImagePreviewItem = memo(
  ({
    image,
    index,
    onRemove,
  }: {
    image: EditableImage | File;
    index: number;
    onRemove: (index: number) => (e: React.MouseEvent) => void;
  }) => {
    const imageUrl = React.useMemo(() => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }
      return 'url' in image ? image.url : '';
    }, [image]);

    React.useEffect(() => {
      // cleanup function에서 URL 해제
      return () => {
        if (image instanceof File && imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [image, imageUrl]);

    return (
      <S.ImagePreview key={'url' in image ? image.id : index}>
        <img src={imageUrl || '/placeholder.svg'} alt={`preview ${index + 1}`} />
        <button type="button" onClick={onRemove(index)}>
          <CircleCloseIcon />
        </button>
      </S.ImagePreview>
    );
  },
);

ImagePreviewItem.displayName = 'ImagePreviewItem';

const ImageUpload = memo(
  forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ hasPreview, images, onDelete, onChange }, ref) => {
      const isMaxImages = images.length >= 5;

      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          onChange(files);
          // 파일 선택 후 input 값 초기화
          e.target.value = '';
        },
        [onChange],
      );

      const handleRemove = useCallback(
        (index: number) => (e: React.MouseEvent) => {
          e.preventDefault();
          onDelete(index);
        },
        [onDelete],
      );

      return (
        <S.UploadWrapper disabled={isMaxImages}>
          <label htmlFor="upload-img">
            <PictureIcon />
            <input
              hidden
              multiple
              ref={ref}
              type="file"
              id="upload-img"
              accept="image/*"
              onChange={handleChange}
              disabled={isMaxImages}
            />
          </label>

          {hasPreview && images.length > 0 && (
            <div css={{ display: 'flex', alignItems: 'center' }}>
              {images.map((image, index) => (
                <ImagePreviewItem
                  key={'url' in image ? image.id : index}
                  image={image}
                  index={index}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </S.UploadWrapper>
      );
    },
  ),
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
