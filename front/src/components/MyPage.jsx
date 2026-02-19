import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const MyPage = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [reloadFlg, setReloadFlg] = useState(0);
  const userId = 3;

  useEffect(() => {
    fetch(`/api/mypages/${userId}`)
      .then((res) => res.json())
      .then((data) => setFavRecipes(data));
  }, [reloadFlg]);

  const handleUnfavorite = (recipeId) => {
    fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
    }).then(() => {
      console.log("削除されました");
      setReloadFlg(reloadFlg + 1);
    });
  };
  return (
    <>
      <p>マイページです。</p>
      {favRecipes.map((favRecipe) => (
        <RecipeCard
          key={favRecipe.id}
          recipe={favRecipe}
          isFavarite={true}
          onClickUnFav={handleUnfavorite}
        />
      ))}
    </>
  );
};
