import { css } from "@emotion/react";
import { Flex, UnorderedList } from "@ahhachul/react-components-layout";

import useModal from "~/components/shared/modal/hooks/useModal";

import 열차번호여부스텝 from "../room/열차번호여부스텝";
import ComplaintOverviewCard from "./OverviewCard";
import { COMPLAINTS_CONTENTS } from "../static/contents";
import { COMPLAINTS_CONTENTS_TYPES } from "../types/contents";

function ComplaintOverviewList() {
  const { handleModalOpen } = useModal();

  const open열차번호여부스텝 = (slug: COMPLAINTS_CONTENTS_TYPES) => () => {
    handleModalOpen(<열차번호여부스텝 slug={slug} />)();
  };

  return (
    <Flex
      as="main"
      style={{
        padding: "26px 20px",
      }}
    >
      <UnorderedList>
        {Object.entries(COMPLAINTS_CONTENTS).map(([key, value]) => (
          <li
            key={key}
            css={css`
              &::marker {
                display: none;
              }
            `}
          >
            <ComplaintOverviewCard
              title={value.label}
              description={value.description}
              onCardClick={open열차번호여부스텝(
                key as COMPLAINTS_CONTENTS_TYPES,
              )}
            />
          </li>
        ))}
      </UnorderedList>
    </Flex>
  );
}

export default ComplaintOverviewList;
