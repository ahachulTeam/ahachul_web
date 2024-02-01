import Head from "next/head";

import { Box } from "@ahhachul/react-components-layout";

import Navbar from "./gnb/Navbar";

function Layout({
  children,
  footer = true,
  background = "white",
  className,
}: {
  children: React.ReactNode;
  footer?: boolean;
  background?: string;
  className?: string;
}) {
  console.log("footer ? :", footer);

  return (
    <Box className={className} style={{ paddingBottom: "99px", background }}>
      <Head>
        <title>아하철</title>
        <meta name="description" content="지하철에서 내 자신을 편하게" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
      <Navbar />
    </Box>
  );
}

export default Layout;
