import { Box, Textarea, Flex } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const InputRecipeMemo = ({
  favRecipe,
  memo,
  onChangeMemo,
  onClickSaveMemo,
}) => (
  <Box mt={2}>
    <Textarea
      rows={5}
      resize="vertical"
      placeholder="メモ記入欄"
      value={memo[favRecipe.id] || ""}
      onChange={(e) => onChangeMemo(e, favRecipe.id)}
      bg="orange.50"
      borderRadius="md"
      fontSize="sm"
      mb={2}
      shadow="sm"
    />
    <Flex justify="flex-end">
      <PrimaryButton
        colorScheme="orange"
        onClick={() => onClickSaveMemo(favRecipe.id)}
        fontWeight="bold"
        px={6}
        shadow="md"
      >
        メモを保存
      </PrimaryButton>
    </Flex>
  </Box>
);
