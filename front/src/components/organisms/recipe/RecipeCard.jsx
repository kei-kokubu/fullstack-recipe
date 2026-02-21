import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const RecipeCard = (props) => {
  const { recipe, isFavarite, onClickFav, onClickUnFav } = props;
  const timestamp = recipe.created_at;
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const yyyymmdd = `${y}/${m}/${d}`;
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      p={4}
      // mb={6}
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "lg" }}
    >
      <Image
        src={recipe.image_url}
        alt={recipe.title}
        h="260px"
        w="460px"
        objectFit="cover"
        borderRadius="md"
        mb={4}
        m="auto"
      />
      <Flex align="center" justify="space-between" mb={2}>
        <Heading as="h3" size="lg" noOfLines={1}>
          {recipe.title}
        </Heading>
        <Badge colorScheme="orange" fontSize="md" borderRadius="sm">
          {recipe.genre}
        </Badge>
      </Flex>
      <Text fontSize="md" color="gray.700" mb={2} noOfLines={2}>
        {recipe.description}
      </Text>
      <Divider mb={2} />
      <Stack spacing={1} mb={2}>
        <Text fontSize="md" color="gray.600">
          <StarIcon mr={1} color="yellow.400" />
          材料: {recipe.ingredients}
        </Text>
        <Text fontSize="md" color="gray.600">
          <StarIcon mr={1} color="orange.300" />
          作り方: {recipe.instructions}
        </Text>
        <Text fontSize="md" color="gray.400">
          {recipe.servenumber}人前
        </Text>
      </Stack>
      <Flex align="center" justify="space-between" mb={2}>
        <Flex align="center">
          <Avatar size="xs" name={recipe.user_name} mr={2} />
          <Text fontSize="sm" color="gray.500">
            {recipe.user_name}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray.400">
          {yyyymmdd}
        </Text>
      </Flex>
      <Button
        leftIcon={<StarIcon />}
        colorScheme={isFavarite ? "yellow" : "orange"}
        variant={isFavarite ? "solid" : "outline"}
        onClick={() =>
          isFavarite ? onClickUnFav(recipe.id) : onClickFav(recipe.id)
        }
        w="100%"
      >
        {isFavarite ? "お気に入り削除" : "お気に入り登録"}
      </Button>
    </Box>
  );
};
