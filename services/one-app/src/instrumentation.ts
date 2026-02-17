export async function register() {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
    return;
  }

  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  const { startNodeMocking } = await import('./mocks/node');
  startNodeMocking();
}
