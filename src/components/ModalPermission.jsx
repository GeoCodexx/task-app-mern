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
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createPermission as createPermissionAPI,
  updatePermission as updatePermissionAPI,
} from "../api/permissions";

const ModalPermission = ({ isOpen, onClose, permissionData, refetch }) => {
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

  useEffect(() => {
    if (Object.keys(permissionData).length !== 0) {
      setValue("name", permissionData.name);
      setValue("reference", permissionData.reference);

      //Pasamos el focus al Input de titulo
      setFocus("name");
    } else {
      //Si "permissionData" es un objeto vacío, Limpiar el formulario para registrar nueva tarea
      reset();
      setFocus("name");
    }
  }, [permissionData]);

  //Create Permission
  const createPermission = async (permission) => {
    try {
      const rpta = await createPermissionAPI(permission);
      if (rpta) {
        //Mostrar mensaje de confirmacion
        toast({
          title: "Permiso agregado",
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

  //Edit permission
  const updatePermission = async (permission) => {
    //console.log(permission);
    try {
      const res = await updatePermissionAPI(permissionData._id, permission);
      if (res) {
        toast({
          title: "Permiso actualizado",
          description: "Datos actualizados correctamente",
          status: "success",
          duration: 2000,
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

  //Manejar los datos del formulario
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.keys(permissionData).length !== 0) {
          updatePermission(values);
        } else {
          createPermission(values);
        }
        resolve();
      }, 1200);
    });
  };
  return (
    <>

      <Modal
        //initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {Object.keys(permissionData).length === 0
              ? "Crear permiso"
              : "Actualizar permiso"}
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
                      value: 3,
                      message: "*Mínimo 3 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.reference} my={4}>
                <FormLabel htmlFor="reference">Referencia</FormLabel>
                <Input
                  id="reference"
                  placeholder="Ej. usuarios, tareas, roles, permisos..."
                  focusBorderColor="teal.400"
                  {...register("reference", {
                    required: "*Rellene este campo",
                    minLength: {
                      value: 3,
                      message: "*Mínimo 3 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.reference && errors.reference.message}
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
                  {Object.keys(permissionData).length === 0
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

export default ModalPermission;
