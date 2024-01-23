import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Flex, Text, Heading, Grid } from "@ahhachul/react-components-layout";

import { SUBWAY_LINE_FILTER_TYPE } from "~/constants/filter";
import BottomSheet from "../bottomSheet/BottomSheet";

interface SubwayLineFilterProps {
  isShowing: boolean;
  onClose: VoidFunction;
  handleApplyFilter: (key: string) => (value: string) => void;
}

function SubwayLineFilter(props: SubwayLineFilterProps) {
  const { isShowing, onClose, handleApplyFilter } = props;

  const { query } = useRouter();
  const selectedValue = query?.subwayLineId;

  const applyFilter = (val: string) => () => {
    onClose();
    setTimeout(() => {
      handleApplyFilter("subwayLineId")(val);
    }, 350);
  };

  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <Flex
        as="section"
        direction="column"
        style={{ width: "100%", paddingBottom: "30px" }}
      >
        <Heading
          fontSize="sm"
          style={{
            padding: "25px 20px 0 20px",
          }}
        >
          호선 변경
        </Heading>
        <Text
          fontSize="sm"
          style={{
            padding: "15px 20px 15px 20px",
            borderBottom: "1px solid #F6F7F9",
          }}
        >
          소식이 궁금한 호선을 선택해주세요
        </Text>
        <Grid
          as="ul"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "6px",
            rowGap: "16px",
            padding: "30px 20px",
          }}
        >
          {Object.entries(SUBWAY_LINE_FILTER_TYPE).map(([value, label]) => (
            <li
              key={value}
              role="option"
              aria-selected={selectedValue === value}
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 32px;
                border-radius: 20px;

                color: #a1a1a1;
                background-color: #f6f7f9;

                &[aria-selected="true"] {
                  color: #fff;
                  background-color: #171717;
                }

                &:active,
                &:focus {
                  color: gray;
                }

                &::marker {
                  color: #fff;
                }
              `}
            >
              <button
                type="button"
                onClick={applyFilter(value)}
                css={css`
                  font-size: 14px;
                  font-weight: 500;
                  width: 100%;
                  text-align: center;
                `}
              >
                {label}
              </button>
            </li>
          ))}
        </Grid>
      </Flex>
    </BottomSheet>
  );
}

export default SubwayLineFilter;
