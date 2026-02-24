import ProfileOverview from '../_components/ProfileOverview';
import { normalizeUsernameParam } from '../_lib/normalizeUsername';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfileSettingsPage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = normalizeUsernameParam(rawUsername);

  return (
    <main className="min-h-screen bg-gray-10">
      <ProfileOverview username={username} mode="settings" />
    </main>
  );
}
