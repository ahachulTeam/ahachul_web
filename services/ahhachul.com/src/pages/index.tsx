import BottomSheet from "~/components/shared/bottomSheet/BottomSheet";
import FixedBottomButton from "~/components/shared/FixedBottomButton";
// import { useToast } from "@components/shared/toast/hooks/useToast";
// import { useAlertContext } from "@contexts/AlertContext";
import useBoolean from "~/hooks/common/useBoolean";
import Head from "next/head";
// import { useCallback } from "react";

export default function Home() {
  // const { addToast } = useToast();
  // const { open } = useAlertContext();

  // const handleBottomButtonClick = useCallback(() => {
  //   open({
  //     title: "새로운 민원을 생성하시겠어요?",
  //     onButtonClick: () =>
  //       addToast({
  //         type: "success",
  //         content: "민원이 전송됐어요. 조금만 기달려주세요.",
  //       }),
  //   });
  // }, [addToast, open]);

  const [isShowing, toggle] = useBoolean(false);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FixedBottomButton label={"민원접수"} onClick={toggle} />
        <BottomSheet isShowing={isShowing} onClickOutside={toggle} />
      </main>
    </>
  );
}
