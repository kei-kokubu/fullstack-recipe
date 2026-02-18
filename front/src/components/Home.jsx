import { useEffect, useState } from "react";
import { InputRecipes } from "./InputRecipe";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [searchRecipeText, setSearchRecipeText] = useState("");

  const nav = useNavigate();

  const onChangeSearchRecipeText = (e) => {
    setSearchRecipeText(e.target.value);
  };

  const onClickSearchRecipe = () => {
    console.log("検索");
    setSearchRecipeText("");
    nav("/recipes");
  };
  return (
    <>
      <h2>レシピ検索</h2>
      <InputRecipes
        searchRecipeText={searchRecipeText}
        onChange={onChangeSearchRecipeText}
        onClickSearch={onClickSearchRecipe}
      />
    </>
  );
};
