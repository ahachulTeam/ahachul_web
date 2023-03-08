import { PropsWithChildren } from "react";

import { AppProvider, StyledComponentsRegistry } from "@/libs";

export const metadata = {
  title: "아하철이형",
  description: "아하철이형_웹",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const { title, description } = metadata;

  return (
    <html lang="ko">
      <head />
      <body>
        <StyledComponentsRegistry>
          <AppProvider>{children}</AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
