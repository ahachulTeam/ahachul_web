import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Link href="/onboarding">
        <button type="button">onboarding</button>
      </Link>
      <Link href="/samplePage">
        <button type="button">samplePage</button>
      </Link>
    </>
  );
}
