import loadable from "@loadable/component";
import { Flex, UnorderedList } from "@ahhachul/react-components-layout";

import ComplaintOverviewCard from "./OverviewCard";
import { COMPLAINTS_CONTENTS } from "../static/contents";
import { COMPLAINTS_CONTENTS_TYPES } from "../types/contents";

const getRoomService = (serviceName: string) => {
  return loadable(() => import(`../room/services/${serviceName}`), {
    cacheKey: () => serviceName,
  });
};

function ComplaintOverviewList(props: {
  open열차번호여부스텝: (slug: COMPLAINTS_CONTENTS_TYPES) => VoidFunction;
}) {
  const { open열차번호여부스텝 } = props;

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
            onMouseOver={() => getRoomService(key).preload()}
            onClick={open열차번호여부스텝(key as COMPLAINTS_CONTENTS_TYPES)}
          >
            <ComplaintOverviewCard
              title={value.label}
              description={value.description}
            />
          </li>
        ))}
      </UnorderedList>
    </Flex>
  );
}

export default ComplaintOverviewList;
