import type { ReactNode } from 'react';

interface InfoPanelSectionProps {
  title: string;
  children: ReactNode;
  badge?: ReactNode;
  titleMarginBottom?: string;
  contentMarginTop?: string;
  paddingBottom?: string;
}

const InfoPanelSection = ({
  title,
  children,
  badge,
  titleMarginBottom = '0',
  contentMarginTop = '0',
  paddingBottom = '10px',
}: InfoPanelSectionProps) => {
  return (
    <div
      css={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        margin: '0 16px',
        paddingTop: '10px',
        paddingBottom,
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          css={{
            color: 'var(--ah-color-legacy-text-faint)',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: titleMarginBottom,
          }}
        >
          {title}
        </div>
        {badge}
      </div>
      <div css={{ marginTop: contentMarginTop }}>{children}</div>
    </div>
  );
};

export default InfoPanelSection;
