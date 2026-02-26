import { LayoutComponent } from '@/components';
import { StackFlow } from '@/stackflow';

const NotificationSettingPage = () => {
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
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>알림 설정</h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6B7280' }}>
          알림 카테고리별 세부 설정은 2차 고도화에서 제공합니다.
        </p>
      </section>

      <section style={{ margin: '12px 16px 0' }}>
        <StackFlow.Link
          activityName="NotificationPage"
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
          알림 목록으로
        </StackFlow.Link>
      </section>
    </LayoutComponent.Base>
  );
};

export default NotificationSettingPage;
