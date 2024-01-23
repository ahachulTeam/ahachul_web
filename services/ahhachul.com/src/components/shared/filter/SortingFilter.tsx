import { useRouter } from "next/router";
import { css } from "@emotion/react";
import {
  Flex,
  Heading,
  UnorderedList,
} from "@ahhachul/react-components-layout";

import { SORT_FILTER_TYPE } from "~/constants/filter";
import BottomSheet from "../bottomSheet/BottomSheet";
import { CheckSVG } from "~/assets/icons";

interface SortingFilterProps {
  isShowing: boolean;
  onClose: VoidFunction;
  handleApplyFilter: (key: string) => (value: string) => void;
}

function SortingFilter(props: SortingFilterProps) {
  const { isShowing, onClose, handleApplyFilter } = props;

  const { query } = useRouter();
  const selectedValue = query?.sort ?? "createdAt";

  const applyFilter = (val: string) => () => {
    onClose();
    setTimeout(() => {
      handleApplyFilter("sort")(val);
    }, 350);
  };

  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <Flex as="section" direction="column" style={{ width: "100%" }}>
        <Heading
          fontSize="sm"
          style={{
            padding: "25px 20px 15px 20px",
            borderBottom: "1px solid #F6F7F9",
          }}
        >
          정렬
        </Heading>
        <UnorderedList>
          {Object.entries(SORT_FILTER_TYPE).map(([value, label]) => (
            <li
              key={value}
              role="option"
              aria-selected={selectedValue === value}
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 54px;
                padding: 0 20px;
                border-bottom: 1px solid #f6f7f9;

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

                  &:active,
                  &:focus {
                    color: gray;
                  }
                `}
              >
                {label}
              </button>
              {selectedValue === value && <CheckSVG />}
            </li>
          ))}
        </UnorderedList>
      </Flex>
    </BottomSheet>
  );
}

export default SortingFilter;
