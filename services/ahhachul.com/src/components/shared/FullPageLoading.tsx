import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, m } from "framer-motion";
import { Flex, Text } from "@ahhachul/react-components-layout";

import Dimmed from "~/components/shared/Dimmed";
import Spacing from "~/components/shared/Spacing";
import { fullPageLoadingVariants } from "~/constants/motions";

interface FullPageLoadingProps {
  show: boolean;
  message?: string;
  className?: string;
}

const FullPageLoading = React.forwardRef(
  (
    { show = true, message, className }: FullPageLoadingProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <AnimatePresence mode="wait">
        {show && (
          <Dimmed backColor="white">
            <Base
              ref={ref}
              className={className}
              aria-haspopup="true"
              aria-labelledby="modal"
              aria-modal="true"
              tabIndex={0}
              variants={fullPageLoadingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Flex
                justify="center"
                align="center"
                style={{ width: "100%", height: "100%" }}
              >
                <Flex direction="column" align="center">
                  <img
                    width={120}
                    src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
                    alt=""
                  />
                  {message != null ? (
                    <>
                      <Spacing size={120} />
                      <Text fontSize="md">{message}</Text>
                    </>
                  ) : null}
                </Flex>
              </Flex>
            </Base>
          </Dimmed>
        )}
      </AnimatePresence>
    );
  },
);

const Base = styled(m.dialog)`
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: var(--z-indexes-dialog);
`;

export default FullPageLoading;
