import type { TypeActivities } from '@/stackflow';
import type { KeyOf } from '@/types/common';

export interface NavItem {
  href: KeyOf<TypeActivities>;
  label: string;
  // icon: React.ReactNode;
}
