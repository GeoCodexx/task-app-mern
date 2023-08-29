import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link to={path}>
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal.300",
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
    </Box></Link>
  );
};

export default NavItem;
