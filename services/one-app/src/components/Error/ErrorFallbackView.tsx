'use client';

interface ErrorFallbackViewProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const DEFAULT_TITLE = '정보를 불러올 수 없습니다.';
const DEFAULT_DESCRIPTION = '잠시 후 다시 시도해주세요. 문제가 계속되면 앱을 다시 실행해주세요.';
const DEFAULT_ACTION_LABEL = '다시 시도';

export default function ErrorFallbackView({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  actionLabel = DEFAULT_ACTION_LABEL,
  onAction,
}: ErrorFallbackViewProps) {
  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-white px-5 py-10 text-center">
      <h1 className="text-title-medium text-gray-90">{title}</h1>
      <p className="mt-2 whitespace-pre-wrap text-body-small text-gray-70">{description}</p>
      {onAction ? (
        <button
          type="button"
          className="mt-4 rounded-lg border border-gray-40 bg-white px-4 py-2 text-label-medium text-gray-90"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
