import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { vars } from "@ahhachul/themes";
import { Button } from "@ahhachul/react-components-button";
import { Box, Flex } from "@ahhachul/react-components-layout";

import { useFilter } from "~/hooks/useFilter";
import useBoolean from "~/hooks/common/useBoolean";
import { TalkLoungeFilterType } from "~/models/talk";
import { KeyOf } from "~/models/common";
import { ChevronSVG } from "~/assets/icons";
import { TALK_LOUNGE_FILTER_LIST } from "./static/filter";

const SubwayLineFilter = dynamic(
  () => import("~/components/shared/filter/SubwayLineFilter"),
  { ssr: false },
);
const SortingFilter = dynamic(
  () => import("~/components/shared/filter/SortingFilter"),
  { ssr: false },
);

function TalkLoungeFilterList() {
  const { filter, handleApplyFilter } = useFilter<KeyOf<TalkLoungeFilterType>>(
    "subwayLineId",
    "sort",
  );

  console.log("filter:", filter);

  const [isShowing, , openHandler, closeHandler] = useBoolean(false);

  const [selectedFilter, setSelectedFilter] =
    useState<KeyOf<typeof TALK_LOUNGE_FILTER_LIST>>("subwayLineId");

  const onOpenFilterModal = useCallback(
    (type: KeyOf<typeof TALK_LOUNGE_FILTER_LIST>) => () => {
      setSelectedFilter(type);
      openHandler();
    },
    [openHandler],
  );

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
    <Box as="section">
      <Flex
        as="ul"
        gap="10px"
        align="center"
        justify="flex-end"
        style={{
          height: "48px",
          padding: "0 20px",
          borderTop: `1px solid ${vars.colors.$scale.gray[300]}`,
          borderBottom: `1px solid ${vars.colors.$scale.gray[300]}`,
          zIndex: 1,
        }}
      >
        {Object.entries(TALK_LOUNGE_FILTER_LIST).map(([key, label]) => (
          <li key={key}>
            <Button
              variant="ghost"
              rightIcon={<ChevronSVG />}
              style={{ padding: 0, gap: 0, fontSize: "14px" }}
              onClick={onOpenFilterModal(key as "subwayLineId" | "sort")}
            >
              {label}
            </Button>
          </li>
        ))}
      </Flex>
      <ModalComponent
        isShowing={isShowing}
        onClose={closeHandler}
        handleApplyFilter={handleApplyFilter}
      />
    </Box>
  );
}

export default TalkLoungeFilterList;
