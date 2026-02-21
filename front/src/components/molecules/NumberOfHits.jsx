import { Box, Flex, Heading, Text } from "@chakra-ui/react";
export const NumberOfHits = (props) => {
  const { keyword, hits } = props;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" pt={10}>
      <Flex align="center" justify="space-between">
        <Heading as="h2" size="lg">
          {keyword}
        </Heading>
        <Text fontSize="xl" color="gray.800">
          （{hits}）
        </Text>
      </Flex>
    </Box>
  );
};
