import { redirect } from 'next/navigation';

export default function LoginFlowRedirectPage() {
  redirect('/login');
}
