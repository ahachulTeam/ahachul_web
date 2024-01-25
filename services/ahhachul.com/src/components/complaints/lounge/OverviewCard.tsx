import { Flex, Text } from "@ahhachul/react-components-layout";

interface ComplaintOverviewCardProps {
  title: string;
  description: string;
  onCardClick: VoidFunction;
  children?: React.ReactNode;
}

function ComplaintOverviewCard(props: ComplaintOverviewCardProps) {
  const { title, description, onCardClick, children } = props;

  return (
    <Flex
      as="article"
      direction="column"
      gap="8px"
      style={{
        padding: "16px",
        borderRadius: "22px",
        border: "1px solid #D6D6D6",
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onCardClick}
    >
      <Text fontSize="xl" as="strong" style={{ fontWeight: 700 }}>
        {title}
      </Text>
      <Text fontSize="xs" as="pre">
        {description}
      </Text>
      {children}
    </Flex>
  );
}

export default ComplaintOverviewCard;
