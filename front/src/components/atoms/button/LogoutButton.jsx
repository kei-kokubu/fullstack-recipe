import { Button } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

export const LogoutButton = (props) => {
  const { logout } = props;
  return (
    <Button onClick={logout}>
      <LuLogOut />
    </Button>
  );
};
