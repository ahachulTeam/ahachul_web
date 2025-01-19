import React, { memo, forwardRef, useCallback } from 'react';

import { CameraIcon, CircleCloseIcon } from '@/assets/icons/system';
import { PostImage } from '@/types';

import * as S from './ImageUpload.styled';

interface ImageUploadProps {
  hasPreview?: boolean;
  images: PostImage[] | File[];
  onDelete: (index: number) => void;
  onChange: (files: File[]) => void;
}

const ImageUpload = memo(
  forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ hasPreview, images, onDelete, onChange }, ref) => {
      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          onChange(files);
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
        <S.UploadWrapper disabled={images.length >= 5}>
          <label htmlFor="image-upload">
            <CameraIcon />
            <input
              hidden
              type="file"
              accept="image/*"
              id="image-upload"
              ref={ref}
              onChange={handleChange}
              multiple
              disabled={images.length >= 5}
            />
          </label>

          {hasPreview && images.length > 0 && (
            <div css={{ display: 'flex', alignItems: 'center' }}>
              {images.map((image, index) => (
                <S.ImagePreview key={'imageUrl' in image ? image.imageId : index}>
                  <img
                    src={'imageUrl' in image ? image.imageUrl : URL.createObjectURL(image)}
                    alt={`preview ${index + 1}`}
                    onLoad={
                      image instanceof File
                        ? () => URL.revokeObjectURL(URL.createObjectURL(image))
                        : undefined
                    }
                  />
                  <button type="button" onClick={handleRemove(index)}>
                    <CircleCloseIcon />
                  </button>
                </S.ImagePreview>
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
