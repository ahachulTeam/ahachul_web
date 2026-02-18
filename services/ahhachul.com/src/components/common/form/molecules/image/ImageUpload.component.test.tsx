import type { SVGProps } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, userEvent } from '@/lib/test-utils';
import type { EditableImage } from '@/types';

import ImageUpload from './ImageUpload.component';

vi.mock('@/assets/icons/system', () => ({
  PictureIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="picture-icon" {...props} />,
  CircleCloseIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="close-icon" {...props} />,
}));

vi.mock('@/assets/images/default_thumbnail.svg', () => ({
  ReactComponent: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="default-thumbnail" {...props} />
  ),
}));

describe('ImageUpload', () => {
  it('파일 선택 시 onChange에 파일 배열을 전달한다', () => {
    const onChange = vi.fn();
    const onDelete = vi.fn();
    const { container } = render(
      <ImageUpload hasPreview={false} images={[]} onDelete={onDelete} onChange={onChange} />,
    );

    const fileInput = container.querySelector('#upload-img') as HTMLInputElement;
    const file = new File(['binary'], 'photo.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([file]);
  });

  it('이미지가 5개 이상이면 업로드 input을 비활성화한다', () => {
    const maxImages: EditableImage[] = [1, 2, 3, 4, 5].map(index => ({
      id: index,
      data: null,
      url: `https://example.com/${index}.png`,
    }));

    const { container } = render(
      <ImageUpload hasPreview={true} images={maxImages} onDelete={vi.fn()} onChange={vi.fn()} />,
    );

    const fileInput = container.querySelector('#upload-img') as HTMLInputElement;
    expect(fileInput).toBeDisabled();
  });

  it('미리보기 삭제 버튼 클릭 시 onDelete를 호출한다', async () => {
    const onDelete = vi.fn();
    const images: EditableImage[] = [{ id: 1, data: null, url: 'https://example.com/1.png' }];

    render(
      <ImageUpload hasPreview={true} images={images} onDelete={onDelete} onChange={vi.fn()} />,
    );

    expect(screen.getByAltText('preview 1')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(0);
  });
});
