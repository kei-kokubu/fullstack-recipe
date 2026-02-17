import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
export const SearchResult = () => {
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      title: "カレー",
      description: "簡単！本格カレー",
    },
    {
      id: "2",
      title: "オムライス",
      description: "ふんわり卵！簡単オムライス",
    },
  ]);
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
