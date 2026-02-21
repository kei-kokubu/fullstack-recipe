import { Button } from "@chakra-ui/react";
export const InputRecipes = (props) => {
  const { searchRecipeText, onChange, onClickSearch } = props;
  return (
    <>
      <input value={searchRecipeText} onChange={onChange} />
      <Button onClick={onClickSearch}>検索</Button>
    </>
  );
};
