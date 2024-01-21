import { Flex, Heading } from "@ahhachul/react-components-layout";

interface HeaderProps {
  left: React.ReactNode;
  centerTitle?: string;
  right?: React.ReactNode;
  className?: string;
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
          fontSize="lg"
          color="blackAlpha"
        >
          {centerTitle}
        </Heading>
      )}
      {right}
    </Flex>
  );
}

export default Header;
