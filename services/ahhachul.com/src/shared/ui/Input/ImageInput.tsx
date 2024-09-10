import React, { memo, forwardRef } from 'react';
import { CameraIcon } from 'shared/static/icons/camera';
import { CircleCloseIcon } from 'shared/static/icons/circle-close';
import * as styles from './ImageInput.css';

interface ImageUploadProps {
  disabled?: boolean;
  hasPreview?: boolean;
  image: Nullable<File>;
  onDelete: VoidFunction;
  onChange: (file: Nullable<File>) => void;
}

export const ImageUpload = memo(
  forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ disabled, hasPreview, image, onDelete, onChange }, ref) => {
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        onChange(file);
      };

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
                src={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                alt="preview"
              />
              <button type="button" onClick={onDelete}>
                <CircleCloseIcon />
              </button>
            </div>
          )}
        </div>
      );
    },
  ),
);
