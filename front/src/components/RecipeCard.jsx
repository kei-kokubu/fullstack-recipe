import "../App.css";

export const RecipeCard = (props) => {
  const { title, description } = props;
  return (
    <div className="recipeCard">
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};
