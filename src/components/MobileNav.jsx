import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Hide,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthProvider";
import { BsPencilSquare } from "react-icons/bs";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ModalProfile from "./ModalProfile";
import { Link } from "react-router-dom";

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const controlsModalProfile = useDisclosure();
  const titleColor = useColorModeValue("gray.600", "gray.500");
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    setDataUser(user);
  }, [user]);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex
        justify="center"
        align="center"
        display={{ base: "flex", md: "none" }}
      >
        <Icon as={BsPencilSquare} boxSize={9} mr={2} color="teal.400" />
        <Link to={"/tasks"}>
          <Text fontSize="2xl" fontWeight="bold">
            Task App
          </Text>
        </Link>
      </Flex>
      <Hide breakpoint="(max-width: 947px)">
        <Flex
          justify={"center"}
          alignContent={"center"}
          w={{ lg: "auto", xl: "60%" }}
          mr={{ lg: 10, xl: 20 }}
        >
          <Text
            px={2}
            textAlign={"center"}
            fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
            fontWeight="bold"
            color={titleColor}
          >
            SISTEMA DE GESTIÓN DE CONTENIDOS
          </Text>
        </Flex>
      </Hide>
      <HStack spacing={{ base: "0", md: "6" }}>
        {/**Button theme dark/light */}
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          display={{ base: "none", md: "block" }}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
         */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    isAuthenticated
                      ? dataUser?.image
                      : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {isAuthenticated ? dataUser?.names : "Brendan Eich"}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {isAuthenticated ? dataUser.role?.name : "CEO"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={controlsModalProfile.onOpen}>Perfil</MenuItem>
              {/* <MenuItem>Cambiar contraseña</MenuItem> */}
              <MenuItem onClick={() => logout()}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <ModalProfile
        isOpen={controlsModalProfile.isOpen}
        onClose={controlsModalProfile.onClose}
        dataUser={dataUser}
      />
    </Flex>
  );
};

export default MobileNav;
