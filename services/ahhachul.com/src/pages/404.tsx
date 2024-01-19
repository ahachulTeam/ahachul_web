import { Text } from "@ahhachul/react-components-layout";
import { Button } from "@ahhachul/react-components-button";

function NotFoundPage() {
  return (
    <div>
      <Text fontSize="md">찾으시는 페이지가 없습니다.</Text>
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

export default NotFoundPage;
