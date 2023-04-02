import { PropsWithChildren } from "react";

import { AppProvider, StyledComponentsRegistry } from "@/libs";

import { Toast } from "@/components";

export const metadata = {
  title: "아하철이형",
  description: "아하철이형_웹",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const { title, description } = metadata;

  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="preload"
          href="/fonts/Pretendard-Regular.otf"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/fonts/Pretendard-Medium.otf" as="font" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/Pretendard-SemiBold.otf"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/fonts/Pretendard-Bold.otf" as="font" crossOrigin="anonymous" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppProvider>{children}</AppProvider>
        </StyledComponentsRegistry>
        <Toast />
      </body>
    </html>
  );
}
