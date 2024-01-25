import { useEffect, useState } from "react";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import LoadingModal from "~/components/shared/FullPageLoading";

import Layout from "~/components/shared/Layout";
import TextRenderer from "~/components/shared/editor/Renderer";
import useTalkRoom from "./hooks/useTalkRoom";

const article = `{"blocks":[{"key":"foo","text":"세상에서 가장 예쁜","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1chn1","text":"한소희... ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hnka","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hae3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2dnrh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4441l","text":"내꺼할래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4k0hg","text":"아님 나 망나니되는꼴볼래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9l0an","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aoob3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"f6dnm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://www.anewsa.com/news_images/2023/07/04/mark/20230704115608.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://wimg.mk.co.kr/news/cms/202401/24/news-p.v1.20240124.fdfa9961816943c8a10d567dccb59a5c_P1.jpg"}}}}`;

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
