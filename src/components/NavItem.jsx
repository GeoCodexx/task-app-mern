import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link
      as={NavLink}
      to={path}
      _hover={{ textDecoration: "none" }}
      _activeLink={{ fontWeight: "bold" }}
    >
      <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color="teal.400"
              mr="4"
              boxSize={5}
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

export default NavItem;
