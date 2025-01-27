import { HelloOnLogin, SocialLogins } from '@/app/(auth)/_component';

export default function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <HelloOnLogin />
      <section className="fixed bottom-[34px] left-0 right-0 flex flex-col gap-2 px-[30px] pt-6">
        <SocialLogins />
      </section>
    </main>
  );
}
