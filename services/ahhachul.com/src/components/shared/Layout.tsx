import Head from "next/head";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@ahhachul/react-components-accordion";
import { Text, Heading, Flex } from "@ahhachul/react-components-layout";

function Layout({
  children,
  footer = true,
}: {
  children: React.ReactNode;
  footer?: boolean;
}) {
  return (
    <>
      <Head>
        <title>아하철</title>
        <meta name="description" content="지하철에서 내 자신을 편하게" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
      {footer && (
        <footer>
          <Accordion>
            <AccordionItem
              itemName="ahhachul-footer"
              style={{ borderTop: "none", borderBottom: "none" }}
            >
              <AccordionButton>
                <Heading color="gray" fontSize="xs">
                  (주)아하철 사업자 정보
                </Heading>
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column">
                  <Text color="gray" fontSize="md">
                    내용입니다.
                  </Text>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </footer>
      )}
    </>
  );
}

export default Layout;
