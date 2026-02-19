import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const MyPage = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [reloadFlg, setReloadFlg] = useState(0);
  const [memo, setMemo] = useState({});
  const userId = 3;

  useEffect(() => {
    fetch(`/api/mypages/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFavRecipes(data);

        const memoObj = {};
        data.forEach((favRecipe) => {
          memoObj[favRecipe.id] = favRecipe.memo || "";
        });
        setMemo(memoObj);
      });
  }, [reloadFlg]);

  const handleUnfavorite = (recipeId) => {
    fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
    }).then(() => {
      setReloadFlg(reloadFlg + 1);
    });
  };

  const onClickSaveMemo = (recipeId) => {
    fetch("/api/favorites/memo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        recipe_id: recipeId,
        memo: memo[recipeId],
      }),
    }).then(() => {
      setReloadFlg(reloadFlg + 1);
    });
  };

  const onChangeMemo = (e, recipeId) => {
    setMemo({ ...memo, [recipeId]: e.target.value });
  };

  return (
    <>
      <p>マイページです。</p>
      {favRecipes.map((favRecipe) => (
        <div key={favRecipe.id}>
          <RecipeCard
            recipe={favRecipe}
            isFavarite={true}
            onClickUnFav={handleUnfavorite}
          />
          <textarea
            rows="5"
            cols="33"
            placeholder="メモ記入欄"
            onChange={(e) => onChangeMemo(e, favRecipe.id)}
            value={memo[favRecipe.id] || ""}
          />
          <button onClick={() => onClickSaveMemo(favRecipe.id)}>
            メモを保存
          </button>
        </div>
      ))}
    </>
  );
};
