import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>아하철</title>
        <meta name="description" content="지하철에서 내 자신을 편하게" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
}

export default Layout;
