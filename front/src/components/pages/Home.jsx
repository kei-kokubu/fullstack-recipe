import { useState } from "react";
import { InputRecipes } from "../molecules/InputRecipe";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";

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

  return (
    <HeaderLayout>
      <InputRecipes
        searchRecipeText={searchRecipeText}
        onChange={onChangeSearchRecipeText}
        onClickSearch={onClickSearchRecipe}
      />
    </HeaderLayout>
  );
};
