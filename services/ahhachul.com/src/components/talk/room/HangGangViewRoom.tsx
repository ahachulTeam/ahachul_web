import NextImage from "next/image";
import { Box, Flex, Text, Divider } from "@ahhachul/react-components-layout";

import {
  BookmarkFillSVG,
  EllipsisHorizontalSVG,
  EyeSVG,
  HeartSVG,
} from "~/assets/icons";
import ResetButton from "~/components/shared/ResetButton";
import TextRenderer from "~/components/shared/editor/Renderer";

import DUMMY_IMG_5 from "public/dummy-img-5.jpg";

const article = `{"blocks":[{"key":"foo","text":"세상에서 가장 예쁜","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1chn1","text":"한소희... ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hnka","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hae3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2dnrh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4441l","text":"내꺼할래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4k0hg","text":"아님 나 망나니되는꼴볼래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9l0an","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aoob3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"f6dnm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://www.anewsa.com/news_images/2023/07/04/mark/20230704115608.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://wimg.mk.co.kr/news/cms/202401/24/news-p.v1.20240124.fdfa9961816943c8a10d567dccb59a5c_P1.jpg"}}}}`;

function HangGangViewRoom() {
  return (
    <>
      <Box
        style={{
          position: "relative",
          width: "100vw",
          aspectRatio: "1 / 0.882667",
          backgroundColor: "#2C2C2C",
        }}
      >
        <NextImage
          src={DUMMY_IMG_5.src}
          alt=""
          sizes="100vw"
          width={0}
          height={0}
          priority
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Flex
        justify="space-between"
        align="center"
        style={{
          height: "54px",
          padding: "0 20px",
          borderRadius: "0px 0px 20px 20px",
          backgroundColor: "#2C2C2C",
        }}
      >
        <Flex align="center">
          <Text
            fontSize="xs"
            style={{ fontWeight: 500, color: "#ffffff", marginRight: "8px" }}
          >
            아이워너굿컴퍼니
          </Text>
          <Text fontSize="xs" style={{ color: "#9EA1AA", marginRight: "4px" }}>
            01.13
          </Text>
          <Text fontSize="xs" style={{ color: "#9EA1AA" }}>
            10:40
          </Text>
        </Flex>
        <Text
          fontSize="xs"
          style={{
            padding: "0 10px",
            backgroundColor: "#f6f7f9",
            height: "24px",
            borderRadius: "100px",
            width: "max-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
          }}
        >
          자유
        </Text>
      </Flex>
      <TextRenderer article={article} />
      <Flex align="center" gap="6px" style={{ padding: "10px 20px 20px 20px" }}>
        <Text fontSize="sm" style={{ fontWeight: 500 }}>
          #해시태그
        </Text>
        <Text fontSize="sm" style={{ fontWeight: 500 }}>
          #해시태그
        </Text>
      </Flex>
      <Divider style={{ margin: 0 }} />
      <Flex
        align="center"
        justify="space-between"
        style={{ padding: "10px 20px" }}
      >
        <Flex align="center" gap="30px">
          <ResetButton
            ItemComponent={
              <Flex align="center" gap="6px">
                <HeartSVG />
                <Text fontSize="sm">1</Text>
              </Flex>
            }
            onClick={() => {}}
          />
          <ResetButton
            ItemComponent={
              <Flex align="center" gap="6px">
                <EyeSVG />
                <Text fontSize="sm">1</Text>
              </Flex>
            }
            onClick={() => {}}
          />
        </Flex>
        <ResetButton ItemComponent={<BookmarkFillSVG />} onClick={() => {}} />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        style={{ height: "68px", padding: "0 20px" }}
      >
        <Text fontSize="sm" style={{ fontWeight: 600 }}>
          댓글 99
        </Text>
        <Flex align="center" gap="12px">
          <Text fontSize="sm" style={{ fontWeight: 600 }}>
            인기순
          </Text>
          <Text fontSize="sm" style={{ fontWeight: 400, color: "#BEC1CB" }}>
            등록순
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        gap="16px"
        style={{ backgroundColor: "#F8F9FB", padding: "16px 22px" }}
      >
        <Flex
          direction="column"
          style={{
            padding: "16px 22px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: "12px" }}
          >
            <Text fontSize="sm" style={{ fontWeight: 600 }}>
              USER NAME
            </Text>
            <ResetButton
              ItemComponent={<EllipsisHorizontalSVG />}
              onClick={() => {}}
            />
          </Flex>
          <Text
            fontSize="sm"
            style={{ fontSize: "14px", marginBottom: "20px" }}
          >
            텃세도 종류가 다양한데 확실히 너무 돌파하기 힘든건 어떤 텃세도
            종류가 다양한데 확실히 너무 돌파하기 힘든건 어떤 텃세도 종류가
            다양한데 확실히 너무 돌파하기 힘든건 어떤 텃세도 종류가 다양한데
            확실히 너무 돌파하기 힘든건 어떤
          </Text>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="20px">
              <ResetButton
                ItemComponent={
                  <Flex align="center" gap="6px">
                    <HeartSVG />
                    <Text fontSize="sm">1</Text>
                  </Flex>
                }
                onClick={() => {}}
              />
              <ResetButton
                ItemComponent={
                  <Text
                    fontSize="sm"
                    style={{ fontWeight: 500, color: "#333" }}
                  >
                    답글 달기
                  </Text>
                }
                onClick={() => {}}
              />
            </Flex>
            <Text fontSize="xs" style={{ fontWeight: 500, color: "#BEC1CB" }}>
              2023년 12월 13일
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default HangGangViewRoom;