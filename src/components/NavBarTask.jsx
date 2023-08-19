import {
  Box,
  Flex,
  Avatar,
  //Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  //useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsPencilSquare } from "react-icons/bs";

/*
const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}*/

const NavBarTask = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  //const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        px={6}
        position="fixed"
        top={0}
        w="full"
        zIndex="banner"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex justify="center" align="center">
            <Icon as={BsPencilSquare} boxSize={9} mr={2} color="teal.400" />
            <Text fontSize="xl" fontWeight="bold">
              TaskApp
            </Text>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Link as={ReactRouterLink} to={"/login"}>
                <Button colorScheme="teal" variant="outline">
                  Iniciar sesión
                </Button>
              </Link>
              <Link as={ReactRouterLink} to={"/register"}>
                <Button colorScheme="teal">Crear cuenta</Button>
              </Link>
              <Button onClick={toggleColorMode} variant="ghost">
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBarTask;
