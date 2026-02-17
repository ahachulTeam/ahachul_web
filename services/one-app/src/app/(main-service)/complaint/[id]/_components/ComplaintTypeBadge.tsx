'use client';

import { usePathname } from 'next/navigation';

import { ServiceBadge } from '@ahhachul/ui';

import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import type { ComplaintType } from '@/types/complaint';

interface Props {
  complaintType: ComplaintType;
}

export const ComplaintTypeBadge = ({ complaintType }: Props) => {
  const pathname = usePathname() ?? '/complaint';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).badges.complaintType;
  const complaintTypeOptions: Record<ComplaintType, string> = {
    ENVIRONMENTAL_COMPLAINT: copy.environmentalComplaint,
    TEMPERATURE_CONTROL: copy.temperatureControl,
    DISORDER: copy.disorder,
    ANNOUNCEMENT: copy.announcement,
    EMERGENCY_PATIENT: copy.emergencyPatient,
    VIOLENCE: copy.violence,
    SEXUAL_HARASSMENT: copy.sexualHarassment,
  };

  return (
    <ServiceBadge
      label={complaintTypeOptions[complaintType]}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
