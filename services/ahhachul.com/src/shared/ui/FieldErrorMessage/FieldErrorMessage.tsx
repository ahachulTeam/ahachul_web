import { HTMLAttributes } from 'react';
import InfoIcon from 'shared/static/icons/info';
import * as styles from './FieldErrorMessage.css';

interface FieldErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  errMsg?: string;
}
export const FieldErrorMessage = ({
  errMsg,
  ...props
}: FieldErrorMessageProps) =>
  errMsg ? (
    <div css={styles.errMsgWrap} {...props}>
      <InfoIcon />
      <span>{errMsg}</span>
    </div>
  ) : null;
