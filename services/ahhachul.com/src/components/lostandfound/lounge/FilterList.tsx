import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@ahhachul/react-components-button";
import { Box, Flex } from "@ahhachul/react-components-layout";

import { useFilter } from "~/hooks/useFilter";
import useBoolean from "~/hooks/common/useBoolean";
import { TalkLoungeFilterType } from "~/models/talk";
import { SubwayLineIdType } from "~/models/subway";
import { KeyOf, SortFilterType } from "~/models/common";
import { SUBWAY_LINE_FILTER_TYPE, SORT_FILTER_TYPE } from "~/constants/filter";
import { ChevronSVG } from "~/assets/icons";

import { LOST_AND_FOUND_LOUNGE_FILTER_LIST } from "./static/filter";
import { LOST_AND_FOUND_LOUNGE_FILTER_TYPES } from "./types/filter";

const SubwayLineFilter = dynamic(
  () => import("~/components/shared/filter/SubwayLineFilter"),
  { ssr: false },
);
const SortingFilter = dynamic(
  () => import("~/components/shared/filter/SortingFilter"),
  { ssr: false },
);

function LoastAndFoundLoungeFilterList(props: { className?: string }) {
  const { className } = props;
  const { filter, handleApplyFilter } = useFilter<KeyOf<TalkLoungeFilterType>>(
    "subwayLineId",
    "sort",
  );

  const getFilterButtonLabel: (
    type: LOST_AND_FOUND_LOUNGE_FILTER_TYPES,
  ) => React.ReactNode = useCallback(
    (type: LOST_AND_FOUND_LOUNGE_FILTER_TYPES) => {
      if (filter?.subwayLineId && type === "subwayLineId") {
        return SUBWAY_LINE_FILTER_TYPE[filter.subwayLineId as SubwayLineIdType];
      }

      if (filter?.sort && type === "sort") {
        return SORT_FILTER_TYPE[filter.sort as SortFilterType];
      }

      return LOST_AND_FOUND_LOUNGE_FILTER_LIST[type];
    },
    [filter],
  );

  const [isModalShowing, , openHandler, closeHandler] = useBoolean(false);

  const [selectedFilter, setSelectedFilter] =
    useState<LOST_AND_FOUND_LOUNGE_FILTER_TYPES>("subwayLineId");

  const onOpenFilterModal = useCallback(
    (type: LOST_AND_FOUND_LOUNGE_FILTER_TYPES) => () => {
      setSelectedFilter(type);
      openHandler();
    },
    [openHandler],
  );

  const uuid = (type: LOST_AND_FOUND_LOUNGE_FILTER_TYPES) => `${type}-filter`;

  let ModalComponent = SubwayLineFilter;
  switch (selectedFilter) {
    case "subwayLineId":
      ModalComponent = SubwayLineFilter;
      break;
    case "sort":
      ModalComponent = SortingFilter;
      break;
    default:
  }

  return (
    <Box as="section" className={className}>
      <Flex
        as="ul"
        gap="10px"
        align="center"
        justify="flex-end"
        style={{
          height: "48px",
          padding: "0 20px",
          zIndex: 1,
        }}
      >
        {Object.entries(LOST_AND_FOUND_LOUNGE_FILTER_LIST).map(
          ([key, label]) => (
            <li key={key}>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={<ChevronSVG />}
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={isModalShowing}
                aria-controls={uuid(key as LOST_AND_FOUND_LOUNGE_FILTER_TYPES)}
                onClick={onOpenFilterModal(
                  key as LOST_AND_FOUND_LOUNGE_FILTER_TYPES,
                )}
                style={{
                  padding: 0,
                  gap: 0,
                }}
              >
                {getFilterButtonLabel(
                  key as LOST_AND_FOUND_LOUNGE_FILTER_TYPES,
                )}
              </Button>
            </li>
          ),
        )}
      </Flex>
      <ModalComponent
        isShowing={isModalShowing}
        onClose={closeHandler}
        handleApplyFilter={handleApplyFilter}
      />
    </Box>
  );
}

export default LoastAndFoundLoungeFilterList;
