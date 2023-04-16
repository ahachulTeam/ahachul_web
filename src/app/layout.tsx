import localFont from "next/font/local";
import { PropsWithChildren } from "react";

import { AppProvider, StyledComponentsRegistry } from "@/libs";

import { Main, Header, Navbar, Toast } from "@/components";

import { StaticSEO, KR_APP_NAME, EN_APP_NAME } from "@/constants/seo";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: {
    default: KR_APP_NAME,
    template: EN_APP_NAME,
  },
  description: StaticSEO.main.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <StyledComponentsRegistry>
          <AppProvider>
<<<<<<< HEAD
            <Header />
            <Main>{children}</Main>
            <Navbar />
=======
            <Main>{children}</Main>
>>>>>>> develop
            <Toast />
            <div id="modal-root" />
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
