import React from "react";
import { useForm } from "react-hook-form";
import NavBarTask from "../components/NavBarTask";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";

const Tasks = () => {
  //Definicion del hook useForm de react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  //Manejar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  return (
    <>
      <nav>
        <NavBarTask />
      </nav>
      <Box px={{ base: "6px", md: "40px" }} py="5">
        <Container maxW="container.xl">
          <Heading textAlign="center" mb="5">
            Tareas
          </Heading>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
            gap={6}
          >
            {/**SECTION LEFT */}
            <GridItem
              w="100%"
              h="auto"
              bg={useColorModeValue("gray.100", "gray.900")}
            >
              <Grid
                w="100%"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  "2xl": "repeat(3, 1fr)",
                }}
                gap={4}
                bg={useColorModeValue("white", "gray.800")}
              >
                {[
                  {
                    title: "Tarea 01",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 02",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 03",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 04",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 05",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 06",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 07",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 08",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 09",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                  {
                    title: "Tarea 10",
                    description:
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                  },
                ].map((elem, i) => (
                  <Card
                    key={i}
                    variant="filled"
                    bg={useColorModeValue("#eff1f1", "gray.700")}
                  >
                    <CardHeader>
                      <Heading size="md"> {elem.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{elem.description}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button>View here</Button>
                    </CardFooter>
                  </Card>
                ))}
              </Grid>
            </GridItem>
            {/**SECTION RIGTH */}
            <GridItem
              w="100%"
              h="auto"
              bg={useColorModeValue("white", "gray.800")}
              rowStart={{ base: "1", lg: "auto" }}
            >
              <Box
                w={{ base: "280px", sm: "400px" }}
                m="auto"
                p={6}
                bg={useColorModeValue("white", "gray.700")}
                borderRadius={"lg"}
                boxShadow={"lg"}
              >
                {/**FORM COMPONENT */}
                <Heading size="md" textAlign="center" mb={8}>
                  Registrar Tarea
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={errors.title}>
                    <FormLabel htmlFor="title">Título</FormLabel>
                    <Input
                      id="title"
                      placeholder="Título de tu tarea"
                      {...register("title", {
                        required: "Rellene este campo",
                        minLength: {
                          value: 4,
                          message: "Mínimo 4 caracteres",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.description} my={4}>
                    <FormLabel htmlFor="description">Descripción</FormLabel>
                    <Textarea
                      id="description"
                      placeholder="Escribe aquí..."
                      {...register("description", {
                        required: "Rellene este campo",
                        minLength: {
                          value: 8,
                          message: "Mínimo 10 caracteres",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    w={{ base: "full" }}
                  >
                    Guardar
                  </Button>
                </form>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Tasks;
