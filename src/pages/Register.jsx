// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "../assets/img/BgSignUp.png";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  //Estado para mostrar y ocultar contraseña en el formulario
  const [showPassword, setShowPassword] = useState(false);

  //UseForm de react-hook-form para manejar datos del formulario
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="2.5rem"
        mb="10px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Bienvenido!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="10px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Por favor rellene los campos del formulario con su información
          respectiva.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="5px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Registrarse con...
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaFacebook}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.500"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            o
          </Text>
          <FormControl>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombres
            </FormLabel> */}
            <Input
              placeholder="Nombres"
              focusBorderColor="teal.400"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              mb="24px"
              size="md"
            />
          </FormControl>
          <FormControl>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Apellido paterno
            </FormLabel> */}
            <Input
              placeholder="Apellido paterno"
              focusBorderColor="teal.400"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              mb="24px"
              size="md"
            />
          </FormControl>
          <FormControl>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Apellido materno
            </FormLabel> */}
            <Input
              placeholder="Apellido materno"
              focusBorderColor="teal.400"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              mb="24px"
              size="md"
            />
          </FormControl>
          <FormControl>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Correo electrónico
            </FormLabel> */}
            <Input
              placeholder="Correo electrónico"
              focusBorderColor="teal.400"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              mb="24px"
              size="md"
            />
          </FormControl>
          <FormControl>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Contraseña
            </FormLabel> */}
            <InputGroup>
              <Input
                placeholder="Contraseña"
                borderRadius="15px"
                ms="4px"
                focusBorderColor="teal.400"
                fontSize="sm"
                type={showPassword ? "text" : "password"}
                size="md"
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
          <FormControl display="flex" alignItems="center" my="24px">
            <Switch id="remember-login" colorScheme="teal" me="10px" />
            <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
              Recordarme
            </FormLabel>
          </FormControl>
          <Button
            type="submit"
            bg="teal.300"
            color="white"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
          >
            REGISTRAR
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              ¿Ya tienes una cuenta?
              <Link
                as={ReactRouterLink}
                color={titleColor}
                ms="5px"
                href="#"
                fontWeight="bold"
                to="/login"
              >
                Iniciar sesión
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
