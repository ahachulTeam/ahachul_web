import { cn } from '@/common/utils';

type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const HeaderLeftArea = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center space-x-4', className)} {...props} />
);

const HeaderRightArea = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center space-x-4 justify-end', className)}
    {...props}
  />
);

const HeaderContents = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex-1 flex justify-center items-center', className)}
    {...props}
  />
);

const Header = ({ className, children, ...props }: DrawerHeaderProps) => {
  return (
    <header
      className={cn('flex items-center justify-between px-5 py-3', className)}
      {...props}
    >
      {children}
    </header>
  );
};

Header.LeftArea = HeaderLeftArea;
Header.RightArea = HeaderRightArea;
Header.Contents = HeaderContents;

export default Header;
