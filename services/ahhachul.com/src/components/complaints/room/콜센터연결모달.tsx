import { css } from "@emotion/react";
import { vars } from "@ahhachul/themes";
import { Flex, Text, Heading } from "@ahhachul/react-components-layout";
import { Button } from "@ahhachul/react-components-button";

import BottomSheet from "~/components/shared/bottomSheet/BottomSheet";
import { ChevronSVG } from "~/assets/icons";

import { CALL_CENTER_FILTER_TYPE } from "../static/contents";

interface 콜센터연결모달Props {
  isShowing: boolean;
  onClose: VoidFunction;
}

function 콜센터연결모달({ isShowing, onClose }: 콜센터연결모달Props) {
  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <Flex as="section" direction="column" style={{ width: "100%" }}>
        <Heading
          fontSize="sm"
          style={{
            padding: "25px 20px 0 20px",
          }}
        >
          콜센터 연결
        </Heading>
        <Flex
          align="center"
          style={{
            height: "48px",
            padding: "0 20px",
            borderBottom: "1px solid #F6F7F9",
          }}
        >
          <Text fontSize="sm">어떤 호선에 타고 계신가요?</Text>
        </Flex>
        <Flex as="ul" direction="column" style={{ padding: "10px 0 30px 0" }}>
          {Object.entries(CALL_CENTER_FILTER_TYPE).map(([value, label]) => (
            <li
              key={value}
              role="option"
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 54px;
                padding: 0 20px;
                border-bottom: 1px solid #f6f7f9;
                cursor: pointer;

                &::marker {
                  color: #fff;
                }

                &:active,
                &:focus {
                  background-color: #f6f7f9;
                }
              `}
              onClick={() => {}}
            >
              <Text
                fontSize="sm"
                css={css`
                  width: 100%;
                  font-weight: 600;

                  &:active,
                  &:focus {
                    color: gray;
                  }
                `}
              >
                {label}
              </Text>
              <Flex align="center" gap="6px" style={{ width: "max-content" }}>
                <Text fontSize="sm" style={{ width: "max-content" }}>
                  바로 연결
                </Text>
                <ChevronSVG style={{ transform: "rotate(270deg)" }} />
              </Flex>
            </li>
          ))}
        </Flex>
        <Flex
          align="center"
          justify="center"
          style={{
            width: "100%",
            padding: "30px 20px",
            boxSizing: "border-box",
          }}
        >
          <Button
            size="md"
            color="whiteAlpha"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: vars.colors.$static.dark.color.black,
            }}
          >
            닫기
          </Button>
        </Flex>
      </Flex>
    </BottomSheet>
  );
}

export default 콜센터연결모달;
