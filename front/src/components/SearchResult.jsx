import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
export const SearchResult = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
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
