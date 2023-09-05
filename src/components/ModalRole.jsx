import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createRole as createRoleAPI,
  updateRole as updateRoleAPI,
} from "../api/roles";
import { getPermissions } from "../api/permissions";

const ModalRole = ({ isOpen, onClose, roleData, refetch }) => {
  //Para usar los mensajes Toast de confirmacion
  const toast = useToast();

  const [permList, setPermList] = useState([]);
  const [permsChecked, setPermsChecked] = useState([]);

  useEffect(() => {
    const fetchPerm = async () => {
      try {
        const res = await getPermissions();
        setPermList(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerm();
  }, []);

  //Definicion del hook useForm de react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setFocus,
  } = useForm();

  //Si trae datos en las props en roleData (cuando haga click en editar).
  useEffect(() => {
    //Se comprueba que "roleData" no este vacío para setear los valores de la fila seleccionada al formulario.
    if (Object.keys(roleData).length !== 0) {
      //console.log(roleData);
      //Se dispone de la propiedad setValue del hook useForm() para asignar valores a los campos que controla
      setValue("name", roleData.name);
      setValue("description", roleData.description);
      //Obtenemos en un nuevo arreglo los id de los permisos
      const permsId = roleData.permissions.map((itm) => itm._id);
      //Asignamos al estado los ids
      setPermsChecked(permsId);
      //Pasamos el focus al Input de titulo
      setFocus("name");
    } else {
      //Si "roleData" es un objeto vacío, Limpiar el formulario para registrar nueva tarea
      reset();
      setPermsChecked([]);
      setFocus("name");
    }
  }, [roleData]);

  //Create Role
  const createRole = async (role) => {
    try {
      const rpta = await createRoleAPI({ ...role, permissions: permsChecked });
      if (rpta) {
        //Mostrar mensaje de confirmacion
        toast({
          title: "Confirmación",
          description: "Role registrado correctamente.",
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
          "Ocurrió un problema durante el proceso. Vuelva a intertarlo mas tarde",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //Edit Role
  const updateRole = async (role) => {
    //console.log(role);
    try {
      if (permsChecked.length === 0) {
        toast({
          title: "Error",
          description: "Seleccione al menos un permiso.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const res = await updateRoleAPI(roleData._id, {
          ...role,
          permissions: permsChecked,
        });
        toast({
          title: "Role actualizado",
          description: "Datos actualizados correctamente",
          status: "success",
          duration: 2500,
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

  //Manejar los checkboxes
  const handleChangeCheckBox = (e) => {
    //console.log(permsChecked)
    if (e.target.checked) {
      e.target.isChecked = true;
      setPermsChecked((state) => [...state, e.target.value]);
    } else {
      setPermsChecked((state) => {
        const filteredItems = state.filter((elem) => elem !== e.target.value);
        return filteredItems;
      });
    }
    //console.log(e.target.value, e.target.checked);
    //console.log(permsChecked);
  };

  //Instrucciones al enviar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.keys(roleData).length !== 0) {
          updateRole(values);
        } else {
          createRole(values);
        }
        resolve();
      }, 1200);
    });
  };

  // Creamos un objeto para agrupar los elementos por referencia
  const groupedData = {};

  permList?.forEach((item) => {
    const referencia = item.reference;
    if (!groupedData[referencia]) {
      groupedData[referencia] = [];
    }
    groupedData[referencia].push(item);
  });

  // Creamos un array de divs para cada grupo de elementos
  const renderedDivs = Object.keys(groupedData).map((referencia) => (
    <GridItem mb={4} key={referencia} mx={"auto"}>
      <Text fontSize="md" fontWeight={"medium"} mb={2}>
        {`Gestión de ${referencia}`}
      </Text>
      {groupedData[referencia].map((item, i) => (
        <Box key={item._id}>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox
              colorScheme="teal"
              value={item._id}
              isChecked={permsChecked?.some((p) => p === item._id)}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              {item.name}
            </Checkbox>
          </Stack>
        </Box>
      ))}
    </GridItem>
  ));

  //console.log(permsChecked);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          Object.keys(roleData).length === 0 && setPermsChecked([]);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {Object.keys(roleData).length === 0
              ? "Crear rol"
              : "Actualizar rol"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <Input
                  id="name"
                  focusBorderColor="teal.400"
                  {...register("name", {
                    required: "*Rellene este campo",
                    minLength: {
                      value: 4,
                      message: "*Mínimo 4 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} my={4}>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Describe el rol..."
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
              <Box position="relative" padding="5" mb={3}>
                <Divider />
                <AbsoluteCenter px="8" fontWeight={"semibold"}>
                  Permisos
                </AbsoluteCenter>
              </Box>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={2}
              >
                {renderedDivs}
              </Grid>

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
                  {Object.keys(roleData).length === 0
                    ? "Guardar"
                    : "Actualizar"}
                </Button>

                <Button
                  onClick={() => {
                    onClose();
                    Object.keys(roleData).length === 0 && setPermsChecked([]);
                  }}
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

export default ModalRole;
