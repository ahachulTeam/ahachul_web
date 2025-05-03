import styled from '@emotion/styled';

import DefaultThumbnail from '@/assets/images/default_thumbnail.svg';

type Props = {
  src?: string;
  size?: number;
  minSize?: boolean;
};

export const Avatar = ({ src, size, minSize = true }: Props) => {
  return (
    <StyledAvatar
      src={src ? src : DefaultThumbnail}
      size={size}
      minSize={minSize}
      data-clarity-mask="True"
    />
  );
};

const StyledAvatar = styled.img<Props>`
  width: ${props => (props.size ? props.size + 'px' : '60px')};
  height: ${props => (props.size ? props.size + 'px' : '60px')};
  border-radius: 50%;
  min-width: ${props => (props.minSize ? '48px' : 'unset')};
  min-height: ${props => (props.minSize ? '48px' : 'unset')};
  object-fit: cover;
`;
