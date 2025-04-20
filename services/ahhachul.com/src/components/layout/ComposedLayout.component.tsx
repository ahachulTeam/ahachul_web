import { type ComponentProps, ReactNode } from 'react';

import { LayoutComponent } from '..';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import * as S from './ComposedLayout.styled';

interface ComposedLayoutProps extends ComponentProps<typeof AppScreen> {
  children: ReactNode;
  outerChildren?: ReactNode;
  navigationSlot?: boolean;
  shouldShowBackground?: boolean;
}

const ComposedLayout = ({
  children,
  outerChildren,
  navigationSlot = true,
  shouldShowBackground = true,
  ...props
}: ComposedLayoutProps) => {
  return (
    <S.ComposedLayout data-vaul-drawer-wrapper={shouldShowBackground}>
      {outerChildren}
      <LayoutComponent.Base navigationSlot={navigationSlot} {...props}>
        {children}
      </LayoutComponent.Base>
    </S.ComposedLayout>
  );
};

export default ComposedLayout;
