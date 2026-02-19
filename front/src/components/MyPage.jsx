import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const MyPage = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const id = 3;
  useEffect(() => {
    fetch(`/api/mypages/${id}`)
      .then((res) => res.json())
      .then((data) => setFavRecipes(data));
  }, []);

  const onClickFav = (index) => {
    console.log("お気に入り");
  };
  return (
    <>
      <p>マイページです。</p>
      {favRecipes.map((favRecipe, index) => (
        <RecipeCard
          key={favRecipe.id}
          recipe={favRecipe}
          index={index}
          onClick={onClickFav}
        />
      ))}
    </>
  );
};
