'use client';

import { useQuery } from '@tanstack/react-query';
import { getRedirectUrl } from '../_lib/getRedirectUrl';
import LoginButton from './LoginButton';

export default function SocialLogins() {
  const { data } = useQuery({
    queryKey: ['auth', 'redirectUrl'],
    queryFn: getRedirectUrl,
  });
  console.log('redirectUrl', data);

  return <LoginButton />;
}
