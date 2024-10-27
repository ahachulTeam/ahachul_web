export async function getRedirectUrl() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/redirect-url`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
