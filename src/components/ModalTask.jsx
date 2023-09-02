import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createTask as createTaskAPI,
  updateTask as updateTaskAPI,
} from "../api/tasks";

const ModalTask = ({ isOpen, onClose, taskData, refetch }) => {
  //console.log(taskData);

  const initialRef = useRef(null);

  //Para usar los mensajes Toast de confirmacion
  const toast = useToast();

  //Definicion del hook useForm de react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setFocus,
  } = useForm();

  //Si trae datos en las props en taskData (cuando haga click en editar).
  useEffect(() => {
    //Se comprueba que "taskData" no este vacío para setear los valores de la fila seleccionada al formulario.
    if (Object.keys(taskData).length !== 0) {
      //Se dispone de la propiedad setValue del hook useForm() para asignar valores a los campos que controla
      setValue("title", taskData.title);
      setValue("description", taskData.description);

      /*Formateando fecha "300 = 5 horas ya que estamos en Peru zona horaria GMT-5".
    Lo hice de esta manera porque el input type="datetime-local" acepta el formato yyyy-mm-ddThh:mm:ss*/
      let fecha = new Date(taskData.date);
      fecha.setMinutes(fecha.getMinutes() - 300);
      setValue("date", fecha.toISOString().slice(0, -5));
      //setValue("date", new Date(taskData.date).toISOString().slice(0, -5));

      //Asignamos a un estado la tarea para que el usuario edite los datos necesarios y con la funcion updTask obtener los datos respectivos.
      //setTaskTemp(taskData);

      //Pasamos el focus al Input de titulo
      setFocus("title");
    } else {
      //Si "taskData" es un objeto vacío, Limpiar el formulario para registrar nueva tarea
      reset();
      setFocus("title");
    }
  }, [taskData]);

  //Create Task
  const createTask = async (task) => {
    try {
      //Convirtiendo a tipo date la fecha para que el backend lo reciba sin problema alguno.
      const dataFormatted = { ...task, date: new Date(task.date) };
      //console.log(dateFormatted);

      const { data } = await createTaskAPI(dataFormatted);
      if (data) {
        //Mostrar mensaje de confirmacion
        toast({
          title: "Tarea agregada",
          description: "Tarea registrada correctamente",
          status: "success",
          duration: 1800,
          isClosable: true,
          colorScheme: "teal",
        });
        //Limpiar formulario
        reset();
        //Refrescar los datos en useQuery();
        refetch();
        //Cerrar modal
        onClose();
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

  //Edit Task
  const updateTask = async (task) => {
    //console.log(task);
    try {
      const res = await updateTaskAPI(taskData._id, {
        ...task,
        date: new Date(task.date),
      });
      if (res.data) {
        toast({
          title: "Tarea actualizada",
          description: "Datos actualizados correctamente",
          status: "success",
          duration: 2000,
          isClosable: true,
          colorScheme: "teal",
        });
        //Limpiar formulario
        reset();

        //Restablecer el estado que contiene la tarea a editar para que el boton cambie a Guardar
        //setTaskTemp({});

        //Refrescar los datos en useQuery();
        refetch();
        //Cerrar modal
        onClose();
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

  //Manejar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.keys(taskData).length !== 0) {
          updateTask(values);
        } else {
          createTask(values);
        }
        resolve();
      }, 1200);
    });
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear tarea</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  {Object.keys(taskData).length === 0
                    ? "Guardar"
                    : "Actualizar"}
                </Button>

                <Button
                  onClick={() => onClose()}
                  w={{ base: "full", md: "auto" }}
                  ml={{ base: "0px", md: "14px" }}
                  mt={{ base: 2, md: "0px" }}
                >
                  Cancelar
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTask;
