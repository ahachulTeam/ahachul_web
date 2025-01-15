import { type ComponentProps, ReactNode } from 'react';

import { LayoutComponent } from '..';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import * as S from './ComposedLayout.styled';

interface ComposedLayoutProps extends ComponentProps<typeof AppScreen> {
  children: ReactNode;
  outerChildren: ReactNode;
}

const ComposedLayout = ({ children, outerChildren, ...props }: ComposedLayoutProps) => {
  return (
    <S.ComposedLayout>
      {outerChildren}
      <LayoutComponent.Base navigationSlot {...props}>
        {children}
      </LayoutComponent.Base>
    </S.ComposedLayout>
  );
};

export default ComposedLayout;
