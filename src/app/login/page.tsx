import Link from "next/link";

function LoginPage() {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <Link href={kakaoUrl} style={{ width: "100%" }}>
      <button type="button">카카오 로그인</button>
    </Link>
  );
}

export default LoginPage;
