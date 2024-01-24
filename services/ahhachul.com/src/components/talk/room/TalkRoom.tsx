import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LoadingModal from "~/components/shared/FullPageLoading";

import Layout from "~/components/shared/Layout";
import { useEffect, useState } from "react";
import useTalkRoom from "./hooks/useTalkRoom";

function TalkRoom() {
  const { data: roomService } = useTalkRoom();
  console.log("roomService:", roomService);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <LoadingModal show={isLoading} />
      <main>detailPage</main>
    </Layout>
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
