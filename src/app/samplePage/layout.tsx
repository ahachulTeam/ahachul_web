import { PropsWithChildren } from "react";

import { Navbar } from "@/components";

export default function SamplePageLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
