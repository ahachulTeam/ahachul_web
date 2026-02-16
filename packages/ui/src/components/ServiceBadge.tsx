/** @jsxImportSource react */
import type { CSSProperties, ReactNode } from 'react';

import { colors } from '@ahhachul/design-system';

export type ServiceBadgeTone = 'service' | 'neutral' | 'positive' | 'danger';

export interface ServiceBadgeProps {
  label: string;
  tone?: ServiceBadgeTone;
  leading?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const toneColorMap: Record<ServiceBadgeTone, { backgroundColor: string; color: string }> = {
  service: {
    backgroundColor: colors.badge.service,
    color: colors.white,
  },
  neutral: {
    backgroundColor: colors.gray[20],
    color: colors.gray[90],
  },
  positive: {
    backgroundColor: colors.green[100],
    color: colors.green[800],
  },
  danger: {
    backgroundColor: colors.legacy.surface.danger_tint,
    color: colors.legacy.status.critical,
  },
};

export const ServiceBadge = ({
  label,
  tone = 'service',
  leading,
  className,
  style,
}: ServiceBadgeProps) => {
  const toneColors = toneColorMap[tone];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        minHeight: '28px',
        padding: '0 10px',
        borderRadius: '9999px',
        width: 'max-content',
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 600,
        ...toneColors,
        ...style,
      }}
    >
      {leading}
      <span>{label}</span>
    </span>
  );
};
