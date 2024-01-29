import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { AnimatePresence, Variants, m } from "framer-motion";
import { Flex, Text } from "@ahhachul/react-components-layout";

import Dimmed from "~/components/shared/Dimmed";
import Spacing from "~/components/shared/Spacing";
import { fullPageLoadingVariants } from "~/constants/motions";

interface FullPageLoadingProps {
  show: boolean;
  message?: string;
  variants?: Variants;
  className?: string;
}

const FullPageLoading = React.forwardRef(
  (
    {
      show = true,
      message,
      variants = fullPageLoadingVariants,
      className,
    }: FullPageLoadingProps,
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
              variants={variants}
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
                  <LoadingSpinner />
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

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

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

const LoadingSpinner = styled.span`
  width: 1rem;
  height: 1rem;
  border: 3px solid #f4f5f8;
  border-top: 3px solid #bec1cb;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

export default FullPageLoading;
