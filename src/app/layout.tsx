import localFont from "next/font/local";
import { PropsWithChildren } from "react";

import { AppProvider, StyledComponentsRegistry } from "@/libs";

import { Header, Toast } from "@/components";
import Main from "@/components/main/Main";

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
    default: "아하철이형",
    template: "%s | 아하철이형",
  },
  description: "아하철이형_웹",
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
            <Header />
            <Main>{children}</Main>
            <Toast />
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
