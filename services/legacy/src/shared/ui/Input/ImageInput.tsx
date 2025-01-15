import React, { memo, forwardRef, useCallback } from 'react';

import { ResponseOfImage } from 'entities/with-server';
import { CameraIcon } from 'shared/static/icons/camera';
import { CircleCloseIcon } from 'shared/static/icons/circle-close';

import * as styles from './ImageInput.css';

interface ImageUploadProps {
  hasPreview?: boolean;
  images: ResponseOfImage[] | File[] | null;
  onDelete: (index: number) => void;
  onChange: (files: File[]) => void;
}

export const ImageUpload = memo(
  forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ hasPreview, images, onDelete, onChange }, ref) => {
      console.log('images:', images);
      const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          onChange(files);
        },
        [onChange],
      );

      const handleDelete = useCallback(
        (index: number) => (e: React.MouseEvent) => {
          e.preventDefault();
          onDelete(index);
        },
        [onDelete],
      );

      return (
        <div css={styles.wrap(images.length >= 5)}>
          <label htmlFor="image-upload">
            <CameraIcon />
            <input
              hidden
              type="file"
              accept="image/*"
              id="image-upload"
              ref={ref}
              onChange={handleFileChange}
              multiple
              disabled={images.length >= 5}
            />
          </label>

          {hasPreview && images.length > 0 && (
            <div css={{ display: 'flex', alignItems: 'center' }}>
              {images.map((image, index) => (
                <div key={index} css={styles.image}>
                  <img
                    src={
                      typeof image === 'object'
                        ? (image as ResponseOfImage).imageUrl
                        : URL.createObjectURL(image)
                    }
                    alt={`preview ${index + 1}`}
                    onLoad={
                      typeof image === 'object'
                        ? undefined
                        : () => URL.revokeObjectURL(URL.createObjectURL(image))
                    }
                  />
                  <button type="button" onClick={handleDelete(index)}>
                    <CircleCloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  ),
);

ImageUpload.displayName = 'ImageUpload';
