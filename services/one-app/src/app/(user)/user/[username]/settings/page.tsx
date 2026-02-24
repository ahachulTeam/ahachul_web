import ProfileOverview from '../_components/ProfileOverview';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfileSettingsPage({ params }: Props) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-gray-10">
      <ProfileOverview username={username} mode="settings" />
    </main>
  );
}
