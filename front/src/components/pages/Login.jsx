import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import axios from "axios";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";

export const Login = () => {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({ userId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const { showMessage } = useMessage();

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      await axios.post("/api/login", form);
      await fetchUser();
      showMessage({ title: "ログインしました", status: "success" });
      nav(`/home`);
    } catch (error) {
      // サーバーからのエラーメッセージを参照
      if (error.response) {
        if (error.response.status === 404) {
          showMessage({
            title: "ユーザーが見つかりません",
            status: "error",
          });
        } else if (error.response.status === 401) {
          showMessage({
            title: "パスワードが間違っています",
            status: "error",
          });
        } else {
          showMessage({
            title: "ログイン失敗",
            status: "error",
          });
        }
      } else {
        showMessage({
          title: "通信エラーが発生しました",
          status: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          レシピ検索アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <PrimaryButton
            disabled={form.userId === "" || form.password === ""}
            loading={loading}
            onClick={login}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
};
