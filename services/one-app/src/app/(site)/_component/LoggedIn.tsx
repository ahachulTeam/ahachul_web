'use client';

import { useEffect, useState } from 'react';
import { AuthService } from '@/common/service/AuthService';
import { IS_SERVER } from '@/common/constants/env';

// 없어질 컴포넌트
export default function LoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check login state on the client side
    if (!IS_SERVER) {
      setIsLoggedIn(AuthService.isLoggedIn);
    }
  }, []);

  return <p>Logged in: {isLoggedIn ? '✅' : '❌'}</p>;
}
