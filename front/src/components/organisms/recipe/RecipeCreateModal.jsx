import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import { useUser } from "../../UserContext";

export const RecipeCreateModal = (props) => {
  const { isOpen, onClose } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [genre, setGenre] = useState("");
  const [servenumber, setServenumber] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const { showMessage } = useMessage();
  const { user } = useUser();
  const userId = user.id;

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeIngredients = (e) => setIngredients(e.target.value);
  const onChangeInstructions = (e) => setInstructions(e.target.value);
  const onChangeGenre = (e) => setGenre(e.target.value);
  const onChangeServenumber = (e) => setServenumber(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const fetchRecipe = async (imageUrl) => {
    try {
      const postData = {
        title,
        description,
        ingredients,
        instructions,
        genre,
        servenumber: Number(servenumber),
        image_url: imageUrl,
        user_id: Number(userId),
      };
      await axios.post("/api/recipes", postData);
      showMessage({ title: "レシピを投稿しました", status: "success" });
      onClose();
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setGenre("");
      setServenumber("");
      setImage(null);
      setUrl("");
    } catch {
      showMessage({ title: "レシピの投稿に失敗しました", status: "error" });
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        setUrl(data.data.url);
        await fetchRecipe(data.data.url);
      } else {
        showMessage({
          title: "画像のアップロードに失敗しました",
          status: "error",
        });
      }
    } catch (error) {
      showMessage({
        title: "通信エラーが発生しました",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>レシピ作成</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>タイトル</FormLabel>
              <Input value={title} onChange={onChangeTitle} />
            </FormControl>
            <FormControl>
              <FormLabel>概要</FormLabel>
              <Input value={description} onChange={onChangeDescription} />
            </FormControl>
            <FormControl>
              <FormLabel>材料</FormLabel>
              <Textarea value={ingredients} onChange={onChangeIngredients} />
            </FormControl>
            <FormControl>
              <FormLabel>レシピ</FormLabel>
              <Textarea value={instructions} onChange={onChangeInstructions} />
            </FormControl>
            <FormControl>
              <FormLabel>ジャンル</FormLabel>
              <Input value={genre} onChange={onChangeGenre} />
            </FormControl>
            <FormControl>
              <FormLabel>何人分</FormLabel>
              <Input value={servenumber} onChange={onChangeServenumber} />
            </FormControl>
            <FormControl>
              <FormLabel>画像</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton
            disabled={
              title === "" ||
              description === "" ||
              ingredients === "" ||
              instructions === "" ||
              servenumber === "" ||
              image === null ||
              loading
            }
            loading={loading}
            onClick={handleUpload}
          >
            作成
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
