import { useEffect, useState } from "react";

import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LoadingModal from "~/components/shared/FullPageLoading";

import useTalkRoom from "./hooks/useTalkRoom";
import HangGangViewRoom from "./HangGangViewRoom";
import JustRoom from "./JustRoom";

function TalkRoom() {
  const { data: roomService } = useTalkRoom();
  console.log("roomService:", roomService);
  const [isLoading, setIsLoading] = useState(true);

  const hasImage = true;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <main>
      <LoadingModal show={isLoading} />
      {hasImage ? <HangGangViewRoom /> : <JustRoom />}
    </main>
  );
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary>
      <TalkRoom />
    </ErrorBoundary>
  );
}

export default WrapErrorBoundary;
