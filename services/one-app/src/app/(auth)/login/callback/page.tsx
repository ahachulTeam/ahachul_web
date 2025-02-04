import CallbackRedirect from './_components/CallbackRedirect';

type Props = {
  searchParams: Promise<{ type: string; code: string }>;
};

export default async function AuthCallbackPage({ searchParams }: Props) {
  const query = await searchParams;
  const code = query.code;
  const type = query.type;

  return <CallbackRedirect code={code} type={type} />;
}
