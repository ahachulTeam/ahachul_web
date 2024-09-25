import React, { memo, forwardRef, useCallback } from 'react';
import { CameraIcon } from 'shared/static/icons/camera';
import { CircleCloseIcon } from 'shared/static/icons/circle-close';
import * as styles from './ImageInput.css';

interface ImageUploadProps {
  disabled?: boolean;
  hasPreview?: boolean;
  image: File | null;
  onDelete: () => void;
  onChange: (file: File | null) => void;
}

export const ImageUpload = memo(
  forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ disabled, hasPreview, image, onDelete, onChange }, ref) => {
      const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files ? e.target.files[0] : null;
          onChange(file);
        },
        [onChange],
      );

      const handleDelete = useCallback(
        (e: React.MouseEvent) => {
          e.preventDefault();
          onDelete();
        },
        [onDelete],
      );

      return (
        <div css={styles.wrap(!!image)}>
          <label htmlFor="image-upload">
            <CameraIcon />
            <input
              hidden
              type="file"
              accept="image/*"
              id="image-upload"
              ref={ref}
              disabled={disabled}
              onChange={handleFileChange}
            />
          </label>

          {hasPreview && image && (
            <div id="image-preview" css={styles.image}>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(image))}
              />
              <button type="button" onClick={handleDelete}>
                <CircleCloseIcon />
              </button>
            </div>
          )}
        </div>
      );
    },
  ),
);

ImageUpload.displayName = 'ImageUpload';
