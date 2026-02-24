import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../UserContext";
import { LogoutButton } from "../../atoms/button/LogoutButton";
import { useMessage } from "../../../hooks/useMessage";

export const Header = () => {
  const { user, setUser } = useUser();
  const { showMessage } = useMessage();
  const nav = useNavigate();

  const onClickToMypage = () => {
    nav(`/mypages`);
  };

  const onClickHome = async () => {
    nav(`/home`);
  };

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
      <Flex
        align="center"
        as="a"
        mr={8}
        _hover={{ cursor: "pointer" }}
        onClick={onClickHome}
      >
        <Heading as="h1" size="lg">
          クックストック
        </Heading>
      </Flex>
      <Flex align="center" fontSize="md" flexGrow={2}>
        <Box pr={4}>
          <Link onClick={onClickToMypage}>マイページ</Link>
        </Box>
      </Flex>
      <Flex align="center" fontSize="sm">
        <LogoutButton logout={logout} />
      </Flex>
    </Flex>
  );
};
