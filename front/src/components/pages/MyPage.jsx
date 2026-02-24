import { useEffect, useState } from "react";
import { RecipeCard } from "../organisms/recipe/RecipeCard";
import { useUser } from "../UserContext";
import { Box, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { InputRecipeMemo } from "../molecules/InputRecipeMemo";
import { RecipeCreateModal } from "../organisms/recipe/RecipeCreateModal";
import { FaPlus } from "react-icons/fa";
import { CreateButton } from "../atoms/button/CreateButton";

export const MyPage = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [reloadFlg, setReloadFlg] = useState(0);
  const [memo, setMemo] = useState({});
  const { user, setUser } = useUser();
  const userId = user.id;
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const onClickCreateBtn = () => onOpen();

  return (
    <HeaderLayout>
      <Wrap p={10}>
        {favRecipes.map((favRecipe) => (
          <WrapItem key={favRecipe.id} display="block">
            <RecipeCard
              recipe={favRecipe}
              isFavarite={true}
              onClickUnFav={handleUnfavorite}
            />
            <InputRecipeMemo
              favRecipe={favRecipe}
              memo={memo}
              onChangeMemo={onChangeMemo}
              onClickSaveMemo={onClickSaveMemo}
            />
          </WrapItem>
        ))}
      </Wrap>
      <Box position="fixed" bottom={10} right={20}>
        <CreateButton onClick={onClickCreateBtn}>
          <FaPlus />
        </CreateButton>
      </Box>
      <RecipeCreateModal isOpen={isOpen} onClose={onClose} />
    </HeaderLayout>
  );
};
