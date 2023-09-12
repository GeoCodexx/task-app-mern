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
  useToast,
  Spinner,
  Flex,
  useDisclosure,
  Tooltip,
  Image,
  Collapse,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks";
import ModalConfirmation from "../components/ModalConfirmation";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import noDataImage from "../assets/img/no-data.svg";

const Tasks = () => {
  //Color para las tarjetas
  let bgCardTask = useColorModeValue("#eff1f1", "gray.700");
  let bgBoxes = useColorModeValue("gray.50", "gray.800");
  let boxForm = useColorModeValue("white", "gray.700");

  //Propiedas Modal confirmacion eliminar tarea (hook de Chakra UI)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnCreateTask = useDisclosure();

  //Para usar los mensajes Toast de confirmacion
  const toast = useToast();

  //Estados
  const [listTasks, setListTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskData, setTaskData] = useState({});
  //const [state, dispatch] = useReducer(initValues, second, third);

  //Definicion del hook useForm de react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setFocus,
  } = useForm();

  //Get all tasks
  const getItems = async () => {
    try {
      const response = await getTasks();
      setListTasks(response.data);
      if (isLoading) setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (isLoading) setIsLoading(false);
    }
  };

  //Create Task
  const create = async (task) => {
    try {
      //Convirtiendo a tipo date la fecha para que el backend lo reciba sin problema alguno.
      const dataFormatted = { ...task, date: new Date(task.date) };
      //console.log(dateFormatted);

      const res = await createTask(dataFormatted);
      if (res.data) {
        //Mostrar mensaje de confirmacion
        toast({
          title: "Tarea agregada",
          description: "Tarea registrada correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
          colorScheme: "teal",
        });
        //Limpiar formulario
        reset();
        //Llamar a la funcion para actualizar la lista de tareas
        getItems();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un problema durante el proceso. Vuelva a intertarlo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //Funcion que asigna datos de la tarea a editar en al formulario
  const editTask = (task) => {
    //Se dispone de la propiedad setValue del hook useForm() para asignar valores a los campos que controla
    setValue("title", task.title);
    setValue("description", task.description);

    /*Formateando fecha "300 = 5 horas ya que estamos en Peru zona horaria GMT-5".
    Lo hice de esta manera porque el input type="datetime-local" acepta el formato yyyy-mm-ddThh:mm:ss*/
    let fecha = new Date(task.date);
    fecha.setMinutes(fecha.getMinutes() - 300);
    setValue("date", fecha.toISOString().slice(0, -1));

    //setValue("date", new Date(task.date).toISOString().slice(0, -5)); //Se agrego el metodo slice para quitar la Z de la fecha en formato ISO porque el INPUT tipo datetime-local no acepta el formato con la Z al final.

    //Asignamos a un estado la tarea para que el usuario edite los datos necesarios y con la funcion updTask obtener los datos respectivos.
    setTaskData(task);

    //Pasamos el focus al Input de titulo
    setFocus("title");
  };

  //Edit Task
  const updTask = async (task) => {
    //console.log(task);
    try {
      const id = taskData._id;

      const res = await updateTask(id, { ...task, date: new Date(task.date) });
      if (res.data) {
        toast({
          title: "Tarea actualizada",
          description: "Datos actualizados correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
          colorScheme: "teal",
        });
        //Limpiar formulario
        reset();

        //Restablecer el estado que contiene la tarea a editar para que el boton cambie a Guardar
        setTaskData({});

        //Actualizar la lista de tareas
        getItems();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un problema durante el proceso. Vuelva a intertarlo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //Delete Task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      //Cerrar modal
      onClose();

      //Mostrar mensaje de notificacion
      toast({
        title: "success",
        description: "Tarea eliminada correctamente",
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: "teal",
      });
      //Actualizar la lista de tareas
      getItems();

      //Reiniciar estado de Tarea
      setTaskData("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un problema durante el proceso. Vuelva a intertarlo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //Abrir modal y pasar el id de la tarea para poder eliminarlo
  const openModal = (task) => {
    setTaskData(task);
    onOpen();
  };

  //Limpiar Formulario (Button Cancel)
  const cleanForm = () => {
    reset();
    setTaskData({});
  };

  //Funcion para formatear fecha
  const formatDate = (date) => new Date(date).toLocaleString();

  //Una vez renderizado la pagina ejecuta la funcion getItems para obtener las tareas y actualizar la vista
  useEffect(() => {
    getItems();
  }, []);

  //Manejar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.keys(taskData).length !== 0) {
          updTask(values);
        } else {
          create(values);
        }
        resolve();
      }, 1200);
    });
  };

  if (isLoading)
    return (
      <Flex h={"100vh"} align={"center"} justify={"center"} textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );

  return (
    <>
      <nav style={{ marginBottom: "64px" }}>
        <NavBarTask />
      </nav>
      <Box
        px={{ base: "6px", md: "40px" }}
        py="5"
        bg={bgBoxes}
        minWidth={"340px"}
        mb={"65px"}
        minHeight="100vh"
      >
        <Heading textAlign="center" mb="5">
          Tareas
        </Heading>
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            {/**SECTION LEFT */}
            <GridItem w="100%" h="auto" bg={bgBoxes}>
              <Grid
                w="100%"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  xl: "repeat(2, 1fr)",
                  "2xl": "repeat(2, 1fr)",
                }}
                gap={4}
                bg={bgBoxes}
              >
                {listTasks.length === 0 ? (
                  <>
                    <Flex
                      gridColumn={"1/-1"}
                      flexDirection="column"
                      justify={"center"}
                      align={"center"}
                    >
                      <Image
                        boxSize="350px"
                        src={noDataImage}
                        alt="Imagen de no resultados"
                      />
                      <Text
                        fontSize={20}
                        color={"gray.400"}
                        textAlign={"center"}
                        mt={3}
                      >
                        Aún no tiene tareas creadas. Use el formulario para
                        registrar una tarea.
                      </Text>
                    </Flex>
                  </>
                ) : (
                  listTasks.map((elem, i) => (
                    <Card key={i} variant="filled" bg={bgCardTask}>
                      <CardHeader pb="10px">
                        <Heading size="md"> {elem.title}</Heading>
                      </CardHeader>
                      <CardBody py="10px" position={"relative"}>
                        <Text mb={4}>{elem.description}</Text>
                        <Text position={"absolute"} bottom={"-15px"}>
                          {formatDate(elem.date)}
                        </Text>
                      </CardBody>
                      <CardFooter justify={"right"}>
                        <Tooltip label="Editar" hasArrow>
                          <Button
                            onClick={() => editTask(elem)}
                            size={{ base: "sm", md: "md" }}
                            colorScheme="blue"
                            variant={"ghost"}
                          >
                            <EditIcon boxSize={5} />
                          </Button>
                        </Tooltip>
                        <Tooltip label="Eliminar" hasArrow>
                          <Button
                            onClick={() => openModal(elem)}
                            ml={4}
                            size={{ base: "sm", md: "md" }}
                            colorScheme="red"
                            variant={"ghost"}
                          >
                            <DeleteIcon boxSize={5} />
                          </Button>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </Grid>
            </GridItem>
            {/**SECTION RIGTH */}
            <GridItem
              w="100%"
              h="auto"
              bg={bgBoxes}
              rowStart={{ base: "1", md: "auto" }}
            >
              <Box display={{ base: "block", md: "none" }}>
                <Flex justify={"center"} align={"center"} mb={2}>
                  <Button onClick={btnCreateTask.onToggle} colorScheme="teal">
                    Crear tarea
                  </Button>
                </Flex>

                <Collapse in={btnCreateTask.isOpen} animateOpacity>
                  <Box
                    w={{ base: "full", sm: "400px" }}
                    m={{ base: "0px", sm: "auto" }}
                    p={6}
                    bg={boxForm}
                    borderRadius={"lg"}
                    boxShadow={"lg"}
                  >
                    {/**FORM COMPONENT */}
                    <Heading size="md" textAlign="center" mb={8}>
                      Registrar Tarea
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                      <FormControl isInvalid={errors.title}>
                        <FormLabel htmlFor="title">Título</FormLabel>
                        <Input
                          id="title"
                          placeholder="ej. Aprender React..."
                          focusBorderColor="teal.400"
                          {...register("title", {
                            required: "*Rellene este campo",
                            minLength: {
                              value: 4,
                              message: "*Mínimo 4 caracteres",
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
                          focusBorderColor="teal.400"
                          {...register("description", {
                            required: "*Rellene este campo",
                            minLength: {
                              value: 8,
                              message: "*Mínimo 10 caracteres",
                            },
                          })}
                        />
                        <FormErrorMessage>
                          {errors.description && errors.description.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.date} my={4}>
                        <Input
                          placeholder="Seleccione una fecha y hora"
                          focusBorderColor="teal.400"
                          size="md"
                          type="datetime-local"
                          {...register("date", {
                            required: "*Ingrese una fecha y hora",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.date && errors.date.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Flex
                        flexDirection={{ base: "column", md: "row" }}
                        justify={"center"}
                        align="center"
                        mt={8}
                      >
                        <Button
                          colorScheme="teal"
                          isLoading={isSubmitting}
                          type="submit"
                          w={{ base: "full", md: "auto" }}
                        >
                          {Object.keys(taskData).length !== 0
                            ? "Actualizar"
                            : "Guardar"}
                        </Button>
                        {}
                        <Button
                          onClick={cleanForm}
                          w={{ base: "full", md: "auto" }}
                          ml={{ base: "0px", md: "14px" }}
                          mt={{ base: 2, md: "0px" }}
                        >
                          Cancelar
                        </Button>
                      </Flex>
                    </form>
                  </Box>
                </Collapse>
              </Box>
              <Box display={{ base: "none", md: "block" }}>
                <Box
                  w={{ base: "full", sm: "400px" }}
                  m={{ base: "0px", sm: "auto" }}
                  p={6}
                  bg={boxForm}
                  borderRadius={"lg"}
                  boxShadow={"lg"}
                >
                  {/**FORM COMPONENT */}
                  <Heading size="md" textAlign="center" mb={8}>
                    Registrar Tarea
                  </Heading>
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <FormControl isInvalid={errors.title}>
                      <FormLabel htmlFor="title">Título</FormLabel>
                      <Input
                        id="title"
                        placeholder="ej. Aprender React..."
                        focusBorderColor="teal.400"
                        {...register("title", {
                          required: "*Rellene este campo",
                          minLength: {
                            value: 4,
                            message: "*Mínimo 4 caracteres",
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
                        focusBorderColor="teal.400"
                        {...register("description", {
                          required: "*Rellene este campo",
                          minLength: {
                            value: 8,
                            message: "*Mínimo 10 caracteres",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.date} my={4}>
                      <Input
                        placeholder="Seleccione una fecha y hora"
                        focusBorderColor="teal.400"
                        size="md"
                        type="datetime-local"
                        {...register("date", {
                          required: "*Ingrese una fecha y hora",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.date && errors.date.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Flex
                      flexDirection={{ base: "column", md: "row" }}
                      justify={"center"}
                      align="center"
                      mt={8}
                    >
                      <Button
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                        w={{ base: "full", md: "auto" }}
                      >
                        {Object.keys(taskData).length !== 0
                          ? "Actualizar"
                          : "Guardar"}
                      </Button>
                      {}
                      <Button
                        onClick={cleanForm}
                        w={{ base: "full", md: "auto" }}
                        ml={{ base: "0px", md: "14px" }}
                        mt={{ base: 2, md: "0px" }}
                      >
                        Cancelar
                      </Button>
                    </Flex>
                  </form>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <ModalConfirmation
        isOpen={isOpen}
        onClose={onClose}
        message={"¿Estas seguro(a) de eliminar esta tarea?"}
        deleteFunction={removeTask}
        idItem={taskData._id}
      />
    </>
  );
};

export default Tasks;
