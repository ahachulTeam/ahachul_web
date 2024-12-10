import * as styles from './LayoutHeaderRightContent.css';
import { FamilyDrawer } from 'shared/ui/FamilyDrawer/FamilyDrawer';

export const EllipsisRightContent = () => {
  return (
    <div css={styles.rightJustOne}>
      <FamilyDrawer />
    </div>
  );
};
