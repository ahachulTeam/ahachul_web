import Image from 'next/image';
import ConditionalRender from './_component/ConditionalRender';

export default function Home() {
  let isVisible = false;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>App Router</h1>
    </main>
  );
}
