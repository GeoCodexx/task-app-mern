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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUser as createUserAPI,
  updateUser as updateUserAPI,
} from "../api/users";
import { getRoles } from "../api/roles";

const ModalUser = ({ isOpen, onClose, userData, refetch }) => {
  //const initialRef = useRef(null);
  const [roleList, setRoleList] = useState([]);

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

  //Fetch Roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoleList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setValue("names", userData.names);
      setValue("patlastname", userData.patlastname);
      setValue("matlastname", userData.matlastname);
      setValue("email", userData.email);
      //setValue("image", userData.description);
      setValue("role", userData.role._id);

      //Pasamos el focus al Input de titulo
      setFocus("names");
    } else {
      //Si "userData" es un objeto vacío, Limpiar el formulario para registrar nueva tarea
      reset();
      setFocus("names");
    }
  }, [userData]);

  //Create User
  const createUser = async (user) => {
    try {
      const rpta = await createUserAPI(user);
      if (rpta) {
        //Mostrar mensaje de confirmacion
        toast({
          title: "Usuario agregado",
          description: "Usuario registrado correctamente",
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

  //Edit User
  const updateUser = async (user) => {
    try {
      /*AL modificar el formulario, toma en cuenta el campo password pese a que esta renderizado condicionalmente.
      Entonces destructurando las propiedades del objeto se consigue eliminar el campo password*/
      const {password, ...userRest} = user
      //Obtiene el id del usuario que se paso por props y luego en "user" los datos a editar.
      const res = await updateUserAPI(userData._id, userRest);
      if (res) {
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
        if (Object.keys(userData).length !== 0) {
          updateUser(values);
        } else {
          createUser(values);
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
          <ModalHeader textAlign={"center"}>Crear usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormControl isInvalid={errors.names}>
                <FormLabel htmlFor="names">Nombres</FormLabel>
                <Input
                  //ref={initialRef}
                  id="names"
                  focusBorderColor="teal.400"
                  {...register("names", {
                    required: "*Rellene este campo",
                    minLength: {
                      value: 4,
                      message: "*Mínimo 4 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.names.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.patlastname} my={4}>
                <FormLabel htmlFor="patlastname">Apellido paterno</FormLabel>
                <Input
                  id="patlastname"
                  focusBorderColor="teal.400"
                  {...register("patlastname", {
                    required: "*Rellene este campo",
                    minLength: {
                      value: 4,
                      message: "*Mínimo 4 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.patlastname && errors.patlastname.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.matlastname} my={4}>
                <FormLabel htmlFor="matlastname">Apellido materno</FormLabel>
                <Input
                  id="matlastname"
                  focusBorderColor="teal.400"
                  {...register("matlastname", {
                    required: "*Rellene este campo",
                    minLength: {
                      value: 4,
                      message: "*Mínimo 4 caracteres",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.matlastname && errors.matlastname.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email} my={4}>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  focusBorderColor="teal.400"
                  {...register("email", {
                    required: "*Rellene este campo",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              {Object.keys(userData).length === 0 && (
                <FormControl isInvalid={errors.password} my={4}>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    focusBorderColor="teal.400"
                    {...register("password", {
                      required: "*Ingrese una contraseña",
                      minLength: {
                        value: 5,
                        message: "*Mínimo 5 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              <FormControl isInvalid={errors.role} my={4}>
                <FormLabel htmlFor="role">Rol</FormLabel>
                <Select
                  placeholder="Seleccione"
                  id="role"
                  focusBorderColor="teal.400"
                  {...register("role", {
                    required: "*Seleccione una opción",
                  })}
                >
                  {roleList?.map((item, i) => (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                  {/* <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option> */}
                </Select>
                <FormErrorMessage>
                  {errors.role && errors.role.message}
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
                  {Object.keys(userData).length === 0
                    ? "Guardar"
                    : "Actualizar"}
                </Button>

                <Button
                  onClick={()=>onClose()}
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

export default ModalUser;
