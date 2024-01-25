import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LoadingModal from "~/components/shared/FullPageLoading";

import Layout from "~/components/shared/Layout";
import { useEffect, useState } from "react";
import useTalkRoom from "./hooks/useTalkRoom";
import TextRenderer from "~/components/shared/editor/Renderer";

const article = `{"blocks":[{"key":"foo","text":"asdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"acgro","text":"asdasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3jink","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7j5v7","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"1oikn","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ja72","text":"asdasdsdadsasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dr6qa","text":"a","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1ok78","text":"asdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c98tp","text":"asdasd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9bi3j","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f6gj7","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"d0c1p","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{}},"1":{"type":"image","mutability":"IMMUTABLE","data":{}}}}`;

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
      <main>
        <TextRenderer article={article} />
      </main>
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
