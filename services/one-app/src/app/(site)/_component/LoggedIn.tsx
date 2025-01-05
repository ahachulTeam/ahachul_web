'use client';

import { useEffect, useState } from 'react';
<<<<<<< HEAD

=======
>>>>>>> main
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

<<<<<<< HEAD
  return <p>Logged in: {isLoggedIn ? 'O' : 'X'}</p>;
}
=======
  return (
    <p>Logged in: {isLoggedIn ? 'O' : 'X'}</p>
  );
}
>>>>>>> main
