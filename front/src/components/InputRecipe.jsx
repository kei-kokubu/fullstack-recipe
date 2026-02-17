export const InputRecipes = (props) => {
  const { searchRecipeText, onChange, onClickSearch } = props;
  return (
    <>
      <input value={searchRecipeText} onChange={onChange} />
      <button onClick={onClickSearch}>検索</button>
    </>
  );
};
