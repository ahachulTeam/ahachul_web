import Link from 'next/link';

type BridgeAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

type RouteBridgePageProps = {
  title: string;
  description: string;
  actions: BridgeAction[];
  note?: string;
};

function getActionClassName(variant: BridgeAction['variant']) {
  if (variant === 'secondary') {
    return 'border border-gray-40 bg-white text-gray-90';
  }

  return 'border border-key-color bg-key-color text-white';
}

export default function RouteBridgePage({
  title,
  description,
  actions,
  note,
}: RouteBridgePageProps) {
  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white px-4 py-4">
        <h1 className="text-title-small text-gray-100">{title}</h1>
        <p className="mt-2 whitespace-pre-wrap text-body-medium text-gray-80">{description}</p>
        {note ? <p className="mt-2 text-body-small text-gray-60">{note}</p> : null}
      </section>

      <section className="mt-3 grid gap-2">
        {actions.map(action => (
          <Link
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={`inline-flex h-11 items-center justify-center rounded-xl px-4 text-label-medium ${getActionClassName(action.variant)}`}
          >
            {action.label}
          </Link>
        ))}
      </section>
    </main>
  );
}
