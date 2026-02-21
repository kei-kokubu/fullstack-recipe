import { Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../UserContext";
import { LogoutButton } from "../../atoms/button/LogoutButton";
import { useMessage } from "../../../hooks/useMessage";

export const Header = () => {
  const { user, setUser } = useUser();
  const { showMessage } = useMessage();

  const logout = async () => {
    await axios.post("/api/logout");
    showMessage({ title: "ログアウトしました", status: "info" });
    setUser(null);
  };
  return (
    <Flex
      as="nav"
      bg="orange.500"
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{ base: 3, md: 5 }}
    >
      <Flex align="center" as="a" _hover={{ cursor: "pointer" }}>
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
          レシピ検索アプリ
        </Heading>
      </Flex>
      <Flex align="center" fontSize="sm">
        <LogoutButton logout={logout} />
      </Flex>
    </Flex>
  );
};
