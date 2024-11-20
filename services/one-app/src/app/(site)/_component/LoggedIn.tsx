'use client';

import { useEffect, useState } from 'react';
import { AuthService } from '@/common/service/AuthService';

// 없어질 컴포넌트
export default function LoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check login state on the client side
    setIsLoggedIn(AuthService.isLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <p>
      Logged in: {isLoggedIn ? 'O' : 'X'}
      <button
        onClick={() => {
          throw new Error('에러 던지기!');
        }}
      >
        throw Error
      </button>
      <br />
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        새로고침!
      </button>
    </p>
  );
}
