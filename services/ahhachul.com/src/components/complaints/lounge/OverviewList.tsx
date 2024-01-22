import styled from "@emotion/styled";

import { vars } from "@ahhachul/themes";
import { Flex } from "@ahhachul/react-components-layout";
import ComplaintOverviewCard from "./OverviewCard";

const HEADER_HEIGHT = "48px";
const PADDING_TOP = "26px";
const PADDING_BOTTOM = "48px";

function ComplaintOverviewList() {
  return (
    <Flex
      as="main"
      direction="column"
      justify="space-between"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT} - ${PADDING_TOP} - ${PADDING_BOTTOM})`,
        padding: "26px 20px 48px 20px",
        backgroundColor: vars.colors.$static.dark.color.black,
      }}
    >
      <FiveGrids>
        <ComplaintOverviewCard
          title="환경민원"
          description={"토사물, 오물, 환기\n각종 환경민원"}
        />
        <ComplaintOverviewCard
          title="안내방송"
          description={"방송불량, 음량문제"}
        />
        <ComplaintOverviewCard
          title="온도조절"
          description={"너무 덥거나 추울 때"}
          isTitleUpperDescription
        />
        <ComplaintOverviewCard
          title="질서저해"
          description={"취객, 노숙, 구걸, 소란\n열차 내 질서저해"}
          isTitleUpperDescription
        />
      </FiveGrids>
      <ThreeGrids>
        <ComplaintOverviewCard
          title="응급환자"
          description={"열차 내 응급환자\n긴급 신고하기"}
        />
        <ComplaintOverviewCard
          title="폭력"
          description={"열차 내 폭행(싸움)\n발생시 신고하기"}
        />
        <ComplaintOverviewCard
          title="성추행"
          description={"열차 내 성폭력, 몰래카메라 등\n 발생시 신고하기"}
          isTitleUpperDescription
        />
      </ThreeGrids>
    </Flex>
  );
}

const FiveGrids = styled.ul`
  display: grid;
  gap: 9px;
  background-color: black;

  & > li {
    &:first-of-type {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &:nth-of-type(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    &:nth-of-type(3) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }

    &:nth-of-type(4) {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
  }
`;

const ThreeGrids = styled.ul`
  display: grid;
  gap: 9px;
  background-color: black;

  & > li {
    &:first-of-type {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &:nth-of-type(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    &:nth-of-type(3) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
  }
`;

export default ComplaintOverviewList;
