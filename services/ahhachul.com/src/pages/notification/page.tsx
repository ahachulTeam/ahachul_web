import { LayoutComponent } from '@/components';
import { StackFlow } from '@/stackflow';

const NotificationPage = () => {
  const items = [
    {
      category: '운행 안내',
      title: '강남역 2호선 상행 지연 제보',
      description: '같은 시간대 제보가 누적되어 신뢰도 배지가 상승했습니다.',
      time: '약 8분 전',
    },
    {
      category: '커뮤니티',
      title: '성수역 환승 동선 팁이 업데이트되었습니다.',
      description: '상행 5-2칸 기준 최단 환승 동선이 반영되었습니다.',
      time: '약 22분 전',
    },
  ];

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
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>알림</h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6B7280' }}>
          활동 알림과 운영 알림을 확인할 수 있습니다.
        </p>
      </section>

      <section style={{ display: 'grid', gap: 10, margin: '0 16px' }}>
        {items.map(item => (
          <article
            key={`${item.category}-${item.title}`}
            style={{
              border: '1px solid #E4E6EB',
              borderRadius: 16,
              background: '#FFFFFF',
              padding: 14,
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: '#2ACF6C', fontWeight: 700 }}>
              {item.category}
            </p>
            <h2 style={{ margin: '6px 0 0', fontSize: 16, lineHeight: 1.4, color: '#111827' }}>
              {item.title}
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#374151' }}>{item.description}</p>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: '#9CA3AF' }}>{item.time}</p>
          </article>
        ))}
      </section>

      <section style={{ display: 'flex', gap: 8, margin: '14px 16px 0' }}>
        <StackFlow.Link
          activityName="NotificationSettingPage"
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
          알림 설정
        </StackFlow.Link>
      </section>
    </LayoutComponent.Base>
  );
};

export default NotificationPage;
