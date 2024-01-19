import { NextPageContext } from "next";

import { Text } from "@ahhachul/react-components-layout";
import { Button } from "@ahhachul/react-components-button";

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div>
      <Text fontSize="md">{statusCode} 에러가 발생했습니다.</Text>
      <Button
        onClick={() => {
          window.history.back();
        }}
      >
        돌아가기
      </Button>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
