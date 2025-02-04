type Props = {
  params: Promise<{
    lostId: string;
  }>;
};

export default async function LostFoundEditPage({ params }: Props) {
  const { lostId } = await params;

  return <div>{lostId}</div>;
}
