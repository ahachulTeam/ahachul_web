import { Interpolation, Theme } from '@emotion/react';
import { IntersectionOptions } from 'react-intersection-observer';

export interface IUiStore {
  loading: {
    active: boolean;
    opacity?: number;
  };
  snackBars: ISnackBar;
}

export type HeaderType = 'default' | 'search' | 'back';
export interface IHeaderProps {
  headerType?: HeaderType;
  title?: string;
}

export type SizeType = 'small' | 'medium' | 'large';

export type DividerOrientationType = 'horizontal' | 'vertical';

export type DividerThicknessType = 'thin' | 'bold';

export type SizeWithPxType = `${number}px`;

export type SizeWithPercentType = `${number}%`;

export type IconType = React.FC<{
  onClick?: VoidFunction;
  css?: Interpolation<Theme>;
}>;

export type SnackBarPosBottomType = 115 | 155;

export interface ISnackBar {
  list: ISnackBarPayload[];
  posBottom: SnackBarPosBottomType;
}

export interface ISnackBarPayload {
  id: string;
  message: string;
  posBottom?: SnackBarPosBottomType;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DialogButtonGroupProps {
  confirmText: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

export interface DialogProps extends DialogButtonGroupProps, ModalProps {
  title?: string;
  content?: string;
}

export type UseIntersectionObserverProps = {
  callback: () => void;
  intersectionOptions?: IntersectionOptions;
};
