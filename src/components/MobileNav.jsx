import {
  Avatar,
  Box,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthProvider";
import { BsPencilSquare } from "react-icons/bs";

const MobileNav = ({ onOpen, ...rest }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
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
        <Text fontSize="2xl" fontWeight="bold">
          Task App
        </Text>
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
            fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
            fontWeight="semibold"
            color={"gray.600"}
          >
            Sistema de gestión de contenidos
          </Text>
        </Flex>
      </Hide>
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
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
                  src={isAuthenticated ? user.image :
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {isAuthenticated ? user.names : "Brendan Eich"}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {isAuthenticated ? user.role.name : "CEO"}
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
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Configuración</MenuItem>
              <MenuItem>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
