import styled from '@emotion/styled';

import { ReactComponent as DefaultThumbnailIcon } from '@/assets/images/default_thumbnail.svg';

type Props = {
  src?: string;
  size?: number;
  minSize?: boolean;
};

export const Avatar = ({ src, size, minSize = true }: Props) => {
  if (src) {
    return <StyledAvatar src={src} size={size} minSize={minSize} data-clarity-mask="True" />;
  }

  return <StyledDefaultAvatar size={size} minSize={minSize} data-clarity-mask="True" />;
};

const resolveAvatarSize = (size?: number) => (size ? `${size}px` : '60px');

const avatarSizeCss = (props: Props) => `
  width: ${resolveAvatarSize(props.size)};
  height: ${resolveAvatarSize(props.size)};
  border-radius: 50%;
  min-width: ${props.minSize ? '48px' : 'unset'};
  min-height: ${props.minSize ? '48px' : 'unset'};
`;

const StyledAvatar = styled.img<Props>`
  ${props => avatarSizeCss(props)};
  object-fit: cover;
`;

const StyledDefaultAvatar = styled(DefaultThumbnailIcon)<Props>`
  ${props => avatarSizeCss(props)};
  object-fit: cover;
`;
