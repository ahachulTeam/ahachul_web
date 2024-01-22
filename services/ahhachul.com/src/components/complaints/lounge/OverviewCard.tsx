import { Flex, Text } from "@ahhachul/react-components-layout";

interface ComplaintOverviewCardProps {
  title: string;
  description: string;
  isTitleUpperDescription?: boolean;
  IconComponent?: React.ReactNode;
}

function ComplaintOverviewCard(props: ComplaintOverviewCardProps) {
  const {
    title,
    description,
    isTitleUpperDescription = false,
    IconComponent,
  } = props;

  return (
    <Flex
      as="li"
      direction="column"
      gap="8px"
      style={{
        padding: "16px",
        borderRadius: "22px",
        backgroundColor: "white",
      }}
    >
      {isTitleUpperDescription && (
        <Text fontSize="sm" as="pre">
          {description}
        </Text>
      )}
      <Text fontSize="md" as="strong">
        {title}
      </Text>
      {!isTitleUpperDescription && (
        <Text fontSize="sm" as="pre">
          {description}
        </Text>
      )}
      {IconComponent && IconComponent}
    </Flex>
  );
}

export default ComplaintOverviewCard;
