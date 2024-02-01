import loadable from "@loadable/component";
import { Flex, Grid } from "@ahhachul/react-components-layout";

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

  const gridTemplateRows = "";

  return (
    <Flex
      as="main"
      style={{
        height: "calc(100vh - 26px - 48px - 48px - 99px)",
        padding: "26px 20px 48px 20px",
        backgroundColor: "#242424",
      }}
    >
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "calc(100% - 76px)" }}
      >
        <Grid
          as="ul"
          templateColumns="repeat(2, 1fr)"
          style={{
            gap: "8px",
            gridTemplateRows,
          }}
        >
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(0, 4)
            .map(([key, value]) => (
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
        </Grid>
        <Grid
          as="ul"
          templateColumns="repeat(2, 1fr)"
          style={{
            gap: "8px",
            gridTemplateRows,
          }}
        >
          {Object.entries(COMPLAINTS_CONTENTS)
            .slice(4, 7)
            .map(([key, value]) => (
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
        </Grid>
      </Flex>
    </Flex>
  );
}

export default ComplaintOverviewList;
