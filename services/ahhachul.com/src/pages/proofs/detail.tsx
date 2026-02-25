import { type CSSProperties } from 'react';

import { type ActivityComponentType } from '@stackflow/react';

import { formatDisplayDate } from '@ahhachul/utils';

import { LayoutComponent } from '@/components';
import { useFetchDelayProof } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { resolveClientErrorMessage } from '@/utils/observability';

type DelayProofPageParams = {
  proofId: string;
};

const sectionStyle: CSSProperties = {
  border: '1px solid #E4E6EB',
  borderRadius: '12px',
  padding: '14px',
  background: '#FFFFFF',
};

function formatDateTime(value: string): string {
  return formatDisplayDate(value, {
    format: 'short',
    invalidText: value,
  });
}

const DelayProofPage: ActivityComponentType<DelayProofPageParams> = ({
  params,
}: {
  params: DelayProofPageParams;
}) => {
  const { push } = useFlow();
  const proofId = params.proofId ?? '';
  const proofQuery = useFetchDelayProof(proofId, { enabled: proofId.length > 0 });

  const proof = proofQuery.data;

  return (
    <LayoutComponent.Base>
      <div
        style={{
          minHeight: '100%',
          background: '#F8F9FB',
          padding: '16px',
          display: 'grid',
          gap: '12px',
        }}
      >
        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 700 }}>지연 증빙 상세</h1>
            <button
              type="button"
              onClick={() => push('DelayCenterPage', {})}
              style={{
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: '#fff',
                padding: '0 10px',
                cursor: 'pointer',
              }}
            >
              통합 센터로
            </button>
          </div>
          <p style={{ marginTop: '6px', fontSize: '12px', color: '#4B5563' }}>
            증빙 ID: {proofId || '-'}
          </p>

          {proofQuery.isPending ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#4B5563' }}>
              증빙 정보를 불러오는 중입니다.
            </p>
          ) : null}

          {proofQuery.isError ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              {resolveClientErrorMessage(
                proofQuery.error,
                '증빙 정보를 불러오지 못했습니다. 만료되었거나 유효하지 않은 증빙일 수 있습니다.',
              )}
            </p>
          ) : null}

          {proof ? (
            <div style={{ marginTop: '10px', display: 'grid', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: '#1F2937' }}>
                등급 {proof.grade} · 신뢰도 {proof.confidenceLevel}
              </div>
              <div style={{ fontSize: '12px', color: '#4B5563' }}>
                발급 {formatDateTime(proof.issuedAt)} · 만료 {formatDateTime(proof.expiresAt)}
              </div>
              <article
                style={{
                  border: '1px solid #EAECEF',
                  borderRadius: '10px',
                  padding: '10px',
                  background: '#FBFBFD',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700 }}>증빙 문구</div>
                <div style={{ marginTop: '6px', whiteSpace: 'pre-line', fontSize: '13px' }}>
                  {proof.text}
                </div>
              </article>
              <div style={{ fontSize: '12px', color: '#4B5563' }}>
                공식 공지 {proof.evidenceSummary.official.eventCount}건 · 커뮤니티 시그널{' '}
                {proof.evidenceSummary.community.signalCount}건 · 실시간 신뢰도{' '}
                {proof.evidenceSummary.realtime.confidenceLevel}
              </div>
              <div style={{ fontSize: '12px', color: '#B91C1C' }}>
                안내: 본 증빙은 참고용이며 법적 효력을 보장하지 않습니다.
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </LayoutComponent.Base>
  );
};

export default DelayProofPage;
