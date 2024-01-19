import { Text } from "@ahhachul/react-components-layout";
import { Button } from "@ahhachul/react-components-button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/shared/toast/hooks/useToast";

function NotFoundPage() {
  const { addToast } = useToast();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      addToast({
        type: "warning",
        content: "찾으시는 페이지가 없습니다.",
      });
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

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
