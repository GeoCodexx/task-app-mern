import { FiGrid, FiFileText, FiUsers, FiSettings } from "react-icons/fi";
import { LiaUsersCogSolid, LiaUserShieldSolid } from "react-icons/lia";
import NavItem from "./NavItem";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";

const LinkItems = [
  { name: "Dashboard", icon: FiGrid, path: "/admin/dashboard" },
  { name: "Tareas", icon: FiFileText, path: "/admin/tasks" },
  { name: "Usuarios", icon: FiUsers, path: "/admin/users" },
  { name: "Roles", icon: LiaUsersCogSolid, path: "/admin/roles" },
  { name: "Permisos", icon: LiaUserShieldSolid, path: "/admin/permissions" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex justify="center" align="center">
          <Icon as={BsPencilSquare} boxSize={9} mr={2} color="teal.400" />
          <Text fontSize="2xl" fontWeight="bold">
            Task App
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <nav id="sidebar">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
      </nav>
    </Box>
  );
};

export default SidebarContent;
