import React, { useContext, useEffect, useState } from "react";

import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
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
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

//react-hook-form
import { useForm } from "react-hook-form";

// Assets
import signInImage from "../assets/img/signInImage.png";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  //Asignar y obtener datos del usuario logeado con el hook de contexto
  const {
    signin,
    isAuthenticated,
    errors: loginErrors,
  } = useContext(AuthContext);
  //hook para navegar por rutas
  const navigate = useNavigate();

  // Chakra color mode
  const titleColor = useColorModeValue("teal.400", "teal.200");
  const textColor = useColorModeValue("gray.500", "white");
  const bgColorForm = useColorModeValue("white", "gray.700");

  //Estado para mostrar y ocultar contraseña en el formulario
  const [showPassword, setShowPassword] = useState(false);

  //Hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //Hook para comprobar si el usuario se autentico correctamente para ser redirigido
  useEffect(() => {
    //Redireccion a la pagina de tareas
    if (isAuthenticated) navigate("/tasks", { replace: true });
  }, [isAuthenticated]);

  //Manejar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        //funcion para autenticar al usuario
        signin(values);
        resolve();
      }, 1300);
    });
  };

  //Hook empleado en este caso para redireccionar al usuario a la pagina de tareas siempre en cuando

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
            background={{ base: "transparent", md: bgColorForm }}
            borderRadius={{ base: "none", md: "xl" }}
            boxShadow={{ base: "none", md: "xl" }}
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bienvenido de nuevo
            </Heading>
            <Text
              mb="30px"
              ms="4px"
              color={textColor}
              fontWeight="semibold"
              fontSize="16px"
            >
              Ingrese su correo electrónico y contraseña para iniciar sesión
            </Text>

            {/**Alerta de errores para el registro de usuario */}
            {loginErrors.length > 0 &&
              loginErrors.map((err, i) => (
                <Alert status="error" mb={2} key={i}>
                  <AlertIcon />
                  {err}
                </Alert>
              ))}
            {/**FORM login*/}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormControl isInvalid={errors.email} mb="24px">
                {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel> */}
                <Input
                  focusBorderColor="teal.400"
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Correo electrónico"
                  size="lg"
                  {...register("email", {
                    required: "*Rellene este campo!",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "*Ingrese un correo valido!",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel> */}
                <InputGroup>
                  <Input
                    focusBorderColor="teal.400"
                    borderRadius="15px"
                    fontSize="sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    size="lg"
                    {...register("password", {
                      required: "*Ingrese su contraseña!",
                    })}
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
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
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
                type="submit"
                bg="teal.400"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "teal.500",
                }}
                _active={{
                  bg: "teal.600",
                }}
                isLoading={isSubmitting}
              >
                INICIAR SESIÓN
              </Button>
            </form>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                ¿No tienes una cuenta?
                <Link
                  to={"/register"}
                  color={titleColor}
                  as={ReactRouterLink}
                  ms="5px"
                  fontWeight="bold"
                >
                  Registrarme
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
