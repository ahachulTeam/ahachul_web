import styled from "@emotion/styled";
// import { DirectMessages, Notifications } from "../domain/alarm";
import PageTemplate from "../public/PageTemplate";
// import { ALARM_TABS } from "@/assets/static/tab";
// import { useTab } from "@/hooks/global";

const AlarmScreen = () => {
  // const { query, selectedTab, handleChangeTab } = useTab(ALARM_TABS);

  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        <Section>
          <Fixed>
            {/* <Tab
              selectedTab={selectedTab}
              tabList={ALARM_TABS}
              handleChangeTab={handleChangeTab}
            /> */}
          </Fixed>
          {/* <Container>
            {(!query?.tab || query?.tab === "notice") && <Notifications />}
            {query?.tab === "dm" && <DirectMessages />}
          </Container> */}
        </Section>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  );
};

const Section = styled.article`
  width: 100%;
`;

const Fixed = styled.div`
  position: fixed;
  width: 100%;
  margin: 0 auto;
`;

export default AlarmScreen;
