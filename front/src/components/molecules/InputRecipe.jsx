import { Box, Flex, Input } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
export const InputRecipes = (props) => {
  const { searchRecipeText, onChange, onClickSearch } = props;
  return (
    <Box
      w="100vw"
      h="150px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="row"
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        gap={4}
        align="center"
        width="600px"
      >
        <Input
          value={searchRecipeText}
          onChange={onChange}
          placeholder="レシピ名や材料を入力"
          size="lg"
        />
        <PrimaryButton onClick={onClickSearch}>検索</PrimaryButton>
      </Flex>
    </Box>
  );
};
