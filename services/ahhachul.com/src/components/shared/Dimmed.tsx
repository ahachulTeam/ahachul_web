import { vars } from "@ahhachul/themes";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties } from "react";

function Dimmed({
  depth = 1,
  backColor = "rgba(0, 0, 0, 0.7)",
  children,
}: {
  depth?: number;
  backColor?: CSSProperties["backgroundColor"];
  children: React.ReactNode;
}) {
  const zIndex = vars.zIndex.zIndexes.dimmed + depth;

  return (
    <Container
      css={css`
        background-color: ${backColor};
        z-index: ${zIndex};
      `}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default Dimmed;
