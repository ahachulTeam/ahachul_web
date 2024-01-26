import { useEffect, useState } from "react";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LoadingModal from "~/components/shared/FullPageLoading";

// import TextRenderer from "~/components/shared/editor/Renderer";
import useTalkRoom from "./hooks/useTalkRoom";
import HangGangViewRoom from "./HangGangViewRoom";
import JustRoom from "./JustRoom";

function TalkRoom() {
  const { data: roomService } = useTalkRoom();
  console.log("roomService:", roomService);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
  const hasImage = true;
=======
  const hasImage = false;
>>>>>>> main

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <main>
      <LoadingModal show={isLoading} />
      {hasImage ? <HangGangViewRoom /> : <JustRoom />}
      {/* <TextRenderer article={article} /> */}
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
