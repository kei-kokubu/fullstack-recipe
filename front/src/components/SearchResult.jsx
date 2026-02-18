import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
export const SearchResult = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // .getにてクエリパラメータに設定した値(keyword)を取得する。
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    if (keyword !== "") {
      fetch(`/api/recipes/${keyword}`)
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    } else {
      fetch("/api/recipes")
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    }
  }, []);
  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
        />
      ))}
    </>
  );
};
