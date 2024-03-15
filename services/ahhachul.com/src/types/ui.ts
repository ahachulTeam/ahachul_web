import { Interpolation, Theme } from '@emotion/react';
import { theme } from 'styles';
import { ValueOf } from 'types/utility-types/ValueOf';

export interface IUiStore {
  loading: boolean;
  snackBars: ISnackBar;
}

export type PrimaryColorValuesType = ValueOf<typeof theme.color.primary>;
export type SubColorValuesType = ValueOf<typeof theme.color.sub>;
export type BackgroundColorValuesType = ValueOf<typeof theme.color.background>;
export type LineColorValuesType = ValueOf<typeof theme.color.line>;
export type GrayColorValuesType = ValueOf<typeof theme.color.gray>;
export type BlueGrayColorValuesType = ValueOf<typeof theme.color.bluegray>;

export type ColorValueType =
  | PrimaryColorValuesType
  | SubColorValuesType
  | BackgroundColorValuesType
  | LineColorValuesType
  | GrayColorValuesType
  | BlueGrayColorValuesType;

export type SizeType = 'small' | 'medium' | 'large';

export type DividerOrientationType = 'horizontal' | 'vertical';

export type DividerThicknessType = 'thin' | 'bold';

export type SizeWithPxType = `${number}px`;

export type SizeWithPercentType = `${number}%`;

export type IconType = React.FC<{
  onClick?: VoidFunction;
  css?: Interpolation<Theme>;
}>;

export type SnackBarPosBottomType = 72 | 120;

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
