import { Flex, Heading } from "@ahhachul/react-components-layout";

import ResetButton from "~/components/shared/ResetButton";
import { BackSVG, CloseSVG } from "~/assets/icons";

interface HeaderProps {
  left: React.ReactNode;
  centerTitle?: string;
  right?: React.ReactNode;
  className?: string;
}

interface HeaderLeftComponentProps {
  contentsType: "go-back" | "close";
  onClick: VoidFunction;
}

function Header({ left, centerTitle, right, className }: HeaderProps) {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      style={{ position: "relative", height: "48px", padding: "0 20px" }}
      className={className}
    >
      {left}
      {centerTitle && (
        <Heading
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          fontSize="sm"
          color="blackAlpha"
        >
          {centerTitle}
        </Heading>
      )}
      {right}
    </Flex>
  );
}

Header.HeaderLeft = function HeaderLeftComponent(
  props: HeaderLeftComponentProps,
) {
  const { contentsType, onClick } = props;

  const ItemComponent = contentsType === "go-back" ? <BackSVG /> : <CloseSVG />;

  return <ResetButton ItemComponent={ItemComponent} onClick={onClick} />;
};

export default Header;
