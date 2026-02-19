import "../App.css";

export const RecipeCard = (props) => {
  const { recipe, isFavarite, onClickFav, onClickUnFav } = props;
  const timestamp = recipe.created_at;
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}/${m}/${d}`;
  return (
    <div className="recipeCard">
      <img src={recipe.image_url} height="200px" />
      <p>{recipe.title}</p>
      <p>{recipe.description}</p>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      <p>{recipe.genre}</p>
      <p>{recipe.servenumber}人前</p>
      {/* <p>{recipe.user_id}</p> */}
      <p>{recipe.user_name}</p>
      <p>{yyyymmdd}</p>
      {!isFavarite ? (
        <button onClick={() => onClickFav(recipe.id)}>お気に入り登録</button>
      ) : (
        <button onClick={() => onClickUnFav(recipe.id)}>お気に入り削除</button>
      )}
    </div>
  );
};
