import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";

export default function MeTalksPage() {
  const router = useRouter();

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        centerTitle="작성 내역"
      />
      <main>글 작성 내역</main>
    </Layout>
  );
}
