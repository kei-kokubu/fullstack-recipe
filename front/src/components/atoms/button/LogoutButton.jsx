import { Button } from "@chakra-ui/react";

export const LogoutButton = (props) => {
  const { logout } = props;
  return <Button onClick={logout}>ログアウト</Button>;
};
