export const RecipeCard = (props) => {
  const { title, description } = props;
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};
