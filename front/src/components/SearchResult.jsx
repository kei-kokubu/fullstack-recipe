import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";

export const SearchResult = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  // .getにてクエリパラメータに設定した値(keyword)を取得する。
  const keyword = searchParams.get("keyword");
  const userId = 3; //ログイン機能実装まで仮

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

  useEffect(() => {
    if (recipes.length > 0) {
      // レシピ一覧分、お気に入り状態チェック
      Promise.all(
        recipes.map((recipe) =>
          fetch(`/api/favorites/check?user_id=${userId}&recipe_id=${recipe.id}`)
            .then((res) => res.json())
            .then((data) => ({ [recipe.id]: data.isFavorite })),
        ),
      ).then((results) => {
        // 結合して状態をセット
        const favMap = Object.assign({}, ...results);
        setFavorites(favMap);
      });
    }
  }, [recipes, userId]);

  // お気に入り登録
  const handleFavorite = (recipeId) => {
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
    }).then(() => {
      setFavorites({ ...favorites, [recipeId]: true });
    });
  };

  // お気に入り削除
  const handleUnfavorite = (recipeId) => {
    fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
    }).then(() => {
      setFavorites({ ...favorites, [recipeId]: false });
    });
  };

  return (
    <>
      <p>{keyword}</p>
      <p>検索結果：{recipes.length}</p>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavarite={favorites[recipe.id] || false}
          onClickFav={handleFavorite}
          onClickUnFav={handleUnfavorite}
        />
      ))}
    </>
  );
};
