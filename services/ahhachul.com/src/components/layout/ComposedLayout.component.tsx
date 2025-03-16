import { type ComponentProps, ReactNode } from 'react';

import { LayoutComponent } from '..';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import * as S from './ComposedLayout.styled';

interface ComposedLayoutProps extends ComponentProps<typeof AppScreen> {
  children: ReactNode;
  outerChildren?: ReactNode;
  navigationSlot?: boolean;
}

const ComposedLayout = ({
  children,
  outerChildren,
  navigationSlot = true,
  ...props
}: ComposedLayoutProps) => {
  return (
    <S.ComposedLayout data-vaul-drawer-wrapper="true">
      {outerChildren}
      <LayoutComponent.Base navigationSlot={navigationSlot} {...props}>
        {children}
      </LayoutComponent.Base>
    </S.ComposedLayout>
  );
};

export default ComposedLayout;
