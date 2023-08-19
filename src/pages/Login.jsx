import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
//client/src/assets/img/signInImage.png
//client/src/assets
// Assets
import signInImage from "../assets/img/signInImage.png";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Login = () => {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  //Estado para mostrar y ocultar contraseña en el formulario
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bienvenido
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Ingrese su correo electrónico y contraseña para iniciar sesión
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Tu dirección de correo"
                size="lg"
              />
            </FormControl>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <InputGroup>
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  size="lg"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl display="flex" alignItems="center" mt="25px">
              <Switch id="remember-login" colorScheme="teal" me="10px" />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                ms="1"
                fontWeight="normal"
              >
                Recordarme
              </FormLabel>
            </FormControl>
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="20px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              SIGN IN
            </Button>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                No tienes una cuenta?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Registrate
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
