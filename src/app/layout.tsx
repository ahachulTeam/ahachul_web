import { PropsWithChildren } from "react";

import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
