import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser, verifyPwd } from "../api/users";
import { loginRequest } from "../api/auth";
const ModalProfile = ({ isOpen, onClose, dataUser }) => {
  //const collapseState = useDisclosure();
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  //console.log(dataUser)
  useEffect(() => {
    setValue("names", dataUser?.names);
    setValue("patlastname", dataUser?.patlastname);
    setValue("matlastname", dataUser?.matlastname);
    setValue("email", dataUser?.email);
  }, [dataUser]);

  const setData = (e) => {
    setIsDisabledInput(false);
    setFocus("names");
    e.target.style.cursor = "not-allowed";
  };

  const cleanPassInputs = () => {
    setValue("password", "");
    setValue("newpass", "");
    setValue("confirmpass", "");
  };

  const updateProfile = async (valuesForm) => {
    try {
      const { password, newpass, confirmpass, ...restProps } = valuesForm;
      //console.log(resData);
      await updateUser(dataUser._id, restProps);
      
      toast({
        title: "Confirmación",
        description: "Sus datos han sido actualizados correctamente",
        status: "success",
        duration: 2200,
        isClosable: true,
        colorScheme: "teal",
      });
      //Cerrar modal
      onClose();
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

  const updatePass = async (valuesForm) => {
    try {
      //Se envia el id del usuario y el password para verificar si es autentico
      const { password } = valuesForm;
      const res = await verifyPwd(dataUser._id, { password });
      //console.log(res);
      //Si es verdadero se procede a ejecutar la actualizacion en la abse de datos
      if (res) {
        //destructurando para enviar la data correspondiente
        const { password, confirmpass, newpass, ...restData } = valuesForm;
        restData.password = newpass;
        await updateUser(dataUser._id, restData);
        //console.log(rpta);
        toast({
            title: "Confirmación",
            description: "Sus datos han sido actualizados correctamente",
            status: "success",
            duration: 2200,
            isClosable: true,
            colorScheme: "teal",
          });
          //Cerrar modal
          onClose();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setError("password", { message: error.response.data[0] });
      }
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

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isChecked) {
          updatePass(values);
        } else {
          updateProfile(values);
        }
        resolve();
      }, 1200);
    });
  };
  return (
    <>
      <Modal
        onClose={() => {
          onClose();
          setIsChecked(false);
          cleanPassInputs();
        }}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <ModalHeader textAlign={"center"}>Perfil de usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justify={"center"} align={"center"}>
                <Avatar
                  size={"xl"}
                  src={dataUser?.image}
                  css={{
                    border: "2px solid white",
                  }}
                >
                  <AvatarBadge boxSize="8" bg="green.500" />
                </Avatar>
                <Button
                  ml={10}
                  size={"sm"}
                  leftIcon={<EditIcon />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={setData}
                >
                  Editar perfil
                </Button>
              </Flex>
              <FormControl isInvalid={errors.names}>
                <FormLabel htmlFor="names">Nombres</FormLabel>
                <Input
                  id="names"
                  type="text"
                  focusBorderColor="teal.400"
                  isReadOnly={isDisabledInput}
                  {...register("names", {
                    required: "*Complete este campo",
                  })}
                />
                <FormErrorMessage>
                  {errors.names && errors.names.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.patlastname}>
                <FormLabel htmlFor="patlastname">Apellido paterno</FormLabel>
                <Input
                  id="patlastname"
                  type="text"
                  focusBorderColor="teal.400"
                  isReadOnly={isDisabledInput}
                  {...register("patlastname", {
                    required: "*Complete este campo",
                  })}
                />
                <FormErrorMessage>
                  {errors.patlastname && errors.patlastname.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.matlastname}>
                <FormLabel htmlFor="matlastname">Apellido materno</FormLabel>
                <Input
                  id="matlastname"
                  type="text"
                  focusBorderColor="teal.400"
                  isReadOnly={isDisabledInput}
                  {...register("matlastname", {
                    required: "*Complete este campo",
                  })}
                />
                <FormErrorMessage>
                  {errors.matlastname && errors.matlastname.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  focusBorderColor="teal.400"
                  isReadOnly={isDisabledInput}
                  {...register("email", {
                    required: "*Complete este campo",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl display="flex" alignItems="center" mt={4}>
                <FormLabel htmlFor="switch-change-pass">
                  ¿Desea cambiar su contraseña?
                </FormLabel>
                <Switch
                  id="switch-change-pass"
                  colorScheme="teal"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </FormControl>
              <Collapse in={isChecked} animateOpacity>
                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Contraseña actual</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    focusBorderColor="teal.400"
                    {...register("password", {
                      required: isChecked ? "*Complete este campo" : false,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.newpass}>
                  <FormLabel htmlFor="newpass">Nueva contraseña</FormLabel>
                  <Input
                    id="newpass"
                    type="password"
                    focusBorderColor="teal.400"
                    {...register("newpass", {
                      required: isChecked.isOpen
                        ? "*Complete este campo"
                        : false,
                      minLength: {
                        value: 5,
                        message: "*Mínimo 5 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.newpass && errors.newpass.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmpass}>
                  <FormLabel htmlFor="confirmpass">
                    Confirmar contraseña
                  </FormLabel>
                  <Input
                    id="confirmpass"
                    type="password"
                    focusBorderColor="teal.400"
                    {...register("confirmpass", {
                      required: isChecked ? "*Complete este campo" : false,
                      validate: (val) => {
                        if (watch("newpass") !== val) {
                          return "*Contraseñas no coinciden.";
                        }
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.confirmpass && errors.confirmpass.message}
                  </FormErrorMessage>
                </FormControl>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justify={"center"}
                align="center"
                w={"full"}
              >
                <Button
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  w={{ base: "full", md: "auto" }}
                >
                  Guardar
                </Button>

                <Button
                  onClick={() => {
                    onClose();
                    setIsChecked(false);
                    cleanPassInputs();
                  }}
                  w={{ base: "full", md: "auto" }}
                  ml={{ base: "0px", md: "14px" }}
                  mt={{ base: 2, md: "0px" }}
                >
                  Cerrar
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProfile;
