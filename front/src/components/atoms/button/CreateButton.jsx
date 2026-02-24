import { Button } from "@chakra-ui/react";

export const CreateButton = (props) => {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <Button
      bg="white"
      color="orange.400"
      borderRadius="full"
      width="60px"
      height="60px"
      p={0}
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
