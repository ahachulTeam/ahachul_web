import { LayoutComponent } from '@/components';
import { StackFlow } from '@/stackflow';

const SubwayMapPage = () => {
  return (
    <LayoutComponent.Base navigationSlot>
      <section
        style={{
          margin: '16px',
          padding: '16px',
          border: '1px solid #E4E6EB',
          borderRadius: 16,
          background: '#FFFFFF',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
          지하철 노선도
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6B7280' }}>
          노선도 인터랙션 고도화는 2차 마이그레이션에서 제공합니다.
        </p>
      </section>

      <section style={{ margin: '12px 16px 0' }}>
        <StackFlow.Link
          activityName="HomePage"
          activityParams={{}}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            padding: '0 14px',
            borderRadius: 12,
            border: '1px solid #D1D5DB',
            background: '#FFFFFF',
            color: '#111827',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          홈으로 이동
        </StackFlow.Link>
      </section>
    </LayoutComponent.Base>
  );
};

export default SubwayMapPage;
