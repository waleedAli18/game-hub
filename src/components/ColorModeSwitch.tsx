import { HStack, Switch, Text, useColorMode, useToast } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const toast = useToast();

  return (
    <>
      <HStack>
        <Switch
          colorScheme="green"
          isChecked={colorMode === "dark"}
          onChange={() => {
            toggleColorMode();
            toast({
              title: `${
                colorMode === "dark" ? "Light" : "Dark"
              } Mode Activated!`,
              position: "top-right",
              isClosable: true,
              variant: "subtle",
              status: "success",
            });
          }}
        />
        <Text>{colorMode === "dark" ? "Light" : "Dark"} Mode</Text>
      </HStack>
    </>
  );
};

export default ColorModeSwitch;
