import { useAlertContext } from "@/contexts/AlertContext";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const { open } = useAlertContext();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      open({
        title: "새로운 지하철역이 생성됐어요",
        onButtonClick: () => {
          window.history.back();
        },
      });
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
