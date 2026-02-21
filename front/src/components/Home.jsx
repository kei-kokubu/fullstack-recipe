import { useState } from "react";
import { InputRecipes } from "./InputRecipe";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { HeaderLayout } from "./templetes/HeaderLayout";

export const Home = () => {
  const [searchRecipeText, setSearchRecipeText] = useState("");

  const nav = useNavigate();

  const onChangeSearchRecipeText = (e) => {
    setSearchRecipeText(e.target.value);
  };

  const onClickSearchRecipe = () => {
    setSearchRecipeText("");
    nav(`/recipes?keyword=${searchRecipeText}`);
  };

  const onClickToMypage = () => {
    nav(`/mypages`);
  };
  return (
    <HeaderLayout>
      <p>レシピ検索</p>
      <InputRecipes
        searchRecipeText={searchRecipeText}
        onChange={onChangeSearchRecipeText}
        onClickSearch={onClickSearchRecipe}
      />
      <br />
      <Button onClick={onClickToMypage}>マイページへ</Button>
    </HeaderLayout>
  );
};
