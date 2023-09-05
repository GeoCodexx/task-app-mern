import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsPencilSquare } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const NavBarTask = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [showAdmPanel, setShowAdmPanel] = useState(false);

  //Verificar si es Admin o Asistente
  useEffect(() => {
    if (isAuthenticated) {
      //console.log(user.roles)
      const verifyRole = user.role.name === "Administrador" || user.role.name === "Asistente";
      //console.log(verifyRole)
      setShowAdmPanel(verifyRole);
    }
  }, [isAuthenticated]);

  const naveg = useNavigate();

  const handleAccessAdminPanel = () => {
    naveg("/admin");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"md"}
        px={{ base: 4, md: 6 }}
        position="fixed"
        top={0}
        w="full"
        zIndex="banner"
        minWidth={"340px"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex justify="center" align="center">
            <Icon as={BsPencilSquare} boxSize={9} mr={2} color="teal.400" />
            <Text fontSize="2xl" fontWeight="bold">
              Task App
            </Text>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {!isAuthenticated ? (
                <>
                  <Link as={ReactRouterLink} to={"/login"}>
                    <Button colorScheme="teal" variant="outline">
                      Iniciar sesión
                    </Button>
                  </Link>
                  {/**Button Register */}
                  <Link
                    as={ReactRouterLink}
                    to={"/register"}
                    display={{ base: "none", md: "block" }}
                  >
                    <Button colorScheme="teal">Crear cuenta</Button>
                  </Link>
                  {/**Button theme dark/light */}
                  <Button
                    onClick={toggleColorMode}
                    variant="ghost"
                    display={{ base: "none", md: "block" }}
                  >
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </>
              ) : (
                <>
                  {/**Button theme dark/light */}
                  <Button
                    onClick={toggleColorMode}
                    variant="ghost"
                    display={{ base: "none", md: "block" }}
                  >
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  {/**Button user Avatar Info */}
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
                        src={
                          user.image
                            ? user.image
                            : "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"lg"}
                          src={
                            user.image
                              ? user.image
                              : "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{isAuthenticated ? user.names : "Username"}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Perfil</MenuItem>
                      {showAdmPanel && (
                        <MenuItem onClick={handleAccessAdminPanel}>
                          Panel Administrativo
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => logout()}
                      >
                        Cerrar sesión
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBarTask;
