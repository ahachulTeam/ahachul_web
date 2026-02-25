'use client';

import React from 'react';

interface CommentTextFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  privateLabel?: string;
  pendingLabel?: string;
  isSubmitting?: boolean;
  isPrivate?: boolean;
  onPrivateChange?: (value: boolean) => void;
  showPrivateToggle?: boolean;
  disabled?: boolean;
  errorMessage?: string | null;
  imageUrls?: string[];
  onImageUrlsChange?: (imageUrls: string[]) => void;
  maxImageUrls?: number;
  imageUrlPlaceholder?: string;
  addImageLabel?: string;
}

export const CommentTextField = React.memo(
  ({
    placeholder,
    value,
    onChange,
    onSubmit,
    onCancel,
    submitLabel = '등록',
    cancelLabel = '취소',
    privateLabel = '비공개 댓글',
    pendingLabel = '처리 중...',
    isSubmitting = false,
    isPrivate = false,
    onPrivateChange,
    showPrivateToggle = true,
    disabled = false,
    errorMessage,
    imageUrls = [],
    onImageUrlsChange,
    maxImageUrls = 8,
    imageUrlPlaceholder = 'https:// 로 시작하는 이미지/GIF URL',
    addImageLabel = '이미지 추가',
  }: CommentTextFieldProps) => {
    const [imageUrlInput, setImageUrlInput] = React.useState('');
    const normalizedImageUrls = imageUrls.filter(url => url.trim().length > 0);
    const canSubmit =
      (value.trim().length > 0 || normalizedImageUrls.length > 0) && !isSubmitting && !disabled;
    const canAddImage =
      imageUrlInput.trim().length > 0 && normalizedImageUrls.length < maxImageUrls && !disabled;

    const handleAddImageUrl = () => {
      const normalized = imageUrlInput.trim();
      if (!normalized) {
        return;
      }
      if (!/^https?:\/\/\S+$/i.test(normalized)) {
        return;
      }
      if (normalizedImageUrls.includes(normalized)) {
        setImageUrlInput('');
        return;
      }
      const nextImageUrls = [...normalizedImageUrls, normalized].slice(0, maxImageUrls);
      onImageUrlsChange?.(nextImageUrls);
      setImageUrlInput('');
    };

    const handleRemoveImageUrl = (imageUrl: string) => {
      onImageUrlsChange?.(normalizedImageUrls.filter(url => url !== imageUrl));
    };

    const handleSubmit = () => {
      if (!canSubmit) {
        return;
      }

      onSubmit?.();
    };

    return (
      <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col gap-3 border-t border-t-gray-30 bg-gray-0 px-4 pb-4 pt-4">
        <textarea
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          disabled={disabled || isSubmitting}
          className="w-full resize-none rounded-[8px] border border-gray-40 p-3 text-body-medium text-gray-90 outline-none placeholder:text-gray-70 focus:border-key-color disabled:cursor-not-allowed disabled:bg-gray-10"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={imageUrlInput}
              onChange={event => setImageUrlInput(event.target.value)}
              placeholder={imageUrlPlaceholder}
              disabled={disabled || isSubmitting || normalizedImageUrls.length >= maxImageUrls}
              className="h-9 flex-1 rounded-[8px] border border-gray-40 px-3 text-body-small text-gray-90 outline-none placeholder:text-gray-70 focus:border-key-color disabled:cursor-not-allowed disabled:bg-gray-10"
            />
            <button
              type="button"
              className="h-9 rounded-[8px] border border-gray-40 bg-white px-3 text-label-small text-gray-90 disabled:cursor-not-allowed disabled:text-gray-60"
              disabled={!canAddImage}
              onClick={handleAddImageUrl}
            >
              {addImageLabel}
            </button>
          </div>
          {normalizedImageUrls.length > 0 ? (
            <ul className="grid grid-cols-4 gap-2">
              {normalizedImageUrls.map(imageUrl => (
                <li
                  key={imageUrl}
                  className="relative overflow-hidden rounded-lg border border-gray-20 bg-white"
                >
                  <img src={imageUrl} alt="첨부 이미지" className="h-16 w-full object-cover" />
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded bg-black/60 px-1 text-[10px] text-white"
                    onClick={() => handleRemoveImageUrl(imageUrl)}
                    disabled={disabled || isSubmitting}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {errorMessage ? <p className="text-body-small text-red">{errorMessage}</p> : null}
        <div className="flex items-center justify-between">
          {showPrivateToggle ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={event => onPrivateChange?.(event.target.checked)}
                disabled={disabled || isSubmitting}
                className="h-[16px] w-[16px]"
              />
              <span className="text-body-medium text-gray-90">{privateLabel}</span>
            </label>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-[30px] items-center justify-center rounded-[3px] border border-gray-40 bg-gray-0 px-[13px] text-body-small text-gray-90 disabled:cursor-not-allowed disabled:text-gray-60"
              onClick={onCancel}
              disabled={disabled || isSubmitting}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="flex h-[30px] items-center justify-center rounded-[3px] border border-key-color bg-key-color px-[13px] text-body-small text-white disabled:cursor-not-allowed disabled:border-gray-60 disabled:bg-gray-60"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? pendingLabel : submitLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

CommentTextField.displayName = 'CommentTextField';
