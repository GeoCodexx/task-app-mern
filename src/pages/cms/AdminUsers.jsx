import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import TableWithPagination from "../../components/TableWithPagination";
import { deleteUser, getUsers } from "../../api/users";
import { useContext, useMemo, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalConfirmation from "../../components/ModalConfirmation";
import noDataTableImage from "../../assets/img/no-data-other.svg";
import ModalUser from "../../components/ModalUser";
import { AuthContext } from "../../contexts/AuthProvider";

const AdminUsers = () => {
  //Contexto gestion de permisos
  const { user } = useContext(AuthContext);
  const permsUser = user?.role?.permissions?.map((item) => {
    if (item.reference === "usuarios") return item.name;
  });

  //Propiedades para los colores ligh/dark
  let bgBoxes = useColorModeValue("white", "gray.700");

  //Toast de Chakra UI instancia
  const toast = useToast();

  //HOOK PARA CONTROLAR EL MODAL
  const { isOpen, onOpen, onClose } = useDisclosure(); //Hook Para el modal de formulario

  const modalConfirm = useDisclosure(); //Hook modal de conformacion de eliminacion

  const [userToEdit, setUserToEdit] = useState({});
  const [idUserDelete, setIdUserDelete] = useState(null);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    //select: (data) => data.sort((a, b) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()),
  });

  //Definicion de las columnas de la tabla y su almacenamiento en cache
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "position",
        Cell: ({ row }) => <span>{Number(row.id) + 1}</span>,
      },
      {
        Header: "Nombre",
        accessor: "names",
        Cell: ({ row }) =>
          `${row.original.names} ${row.original.patlastname} ${row.original.matlastname}`,
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ row }) => (
          <Image
            borderRadius="full"
            boxSize="32px"
            src={row.original.image}
            alt="Img user"
          />
        ),
      },
      {
        Header: "Rol",
        accessor: "role.name",
        /*Cell: ({ row }) =>
          `${row.original.user.names} ${row.original.user.matlastname}`,*/
      },
      {
        Header: "F. Creación",
        accessor: "createdAt",
        Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
      },
      {
        Header: "Opciones",
        accessor: "options",
        Cell: ({ row }) => (
          <HStack spacing="0px">
            {permsUser?.some((elem) => elem === "Editar") && (
              <Tooltip label="Editar" hasArrow>
                <Button
                  onClick={() => handleEdit(row.original)}
                  size={{ base: "sm", md: "md" }}
                  colorScheme="blue"
                  variant={"ghost"}
                >
                  <EditIcon boxSize={5} />
                </Button>
              </Tooltip>
            )}
            {permsUser?.some((elem) => elem === "Eliminar") && (
              <Tooltip label="Eliminar" hasArrow>
                <Button
                  onClick={() => handleDelete(row.original._id)}
                  ml={4}
                  size={{ base: "sm", md: "md" }}
                  colorScheme="red"
                  variant={"ghost"}
                >
                  <DeleteIcon boxSize={5} />
                </Button>
              </Tooltip>
            )}
          </HStack>
        ),
      },
    ],
    []
  );

  const handleAdd = () => {
    setUserToEdit({}); //Setear al estado vacio para que el formulario cargue sin datos en los inputs
    onOpen(); //Abri modal
  };

  const handleEdit = (rowData) => {
    if (rowData._id === "64f37b4b488e5f3c51681675") {
      toast({
        title: "Acción denegada",
        description: "No puede alterar los datos del Administrador",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      setUserToEdit(rowData);
      onOpen();
    }
  };

  const handleDelete = async (id) => {
    if (id === "64f37b4b488e5f3c51681675") {
      toast({
        title: "Acción denegada",
        description: "No puede alterar los datos del Administrador",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      setIdUserDelete(id);
      modalConfirm.onOpen();
    }
  };

  //Delete Task
  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      //Cerrar modal
      modalConfirm.onClose();

      //Mostrar mensaje de notificacion
      toast({
        title: "success",
        description: "Usuario eliminado correctamente",
        status: "error",
        duration: 2000,
        isClosable: true,
        colorScheme: "teal",
      });

      //Actualizar la lista de tareas
      refetch();

      //Reiniciar estado
      setIdUserDelete(null);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un problema durante el proceso. Vuelva a intertarlo de un momento.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Flex justify={"center"} align={"center"} minH={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />
      </Flex>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box as="main" mb={14}>
      <Flex
        align={"center"}
        justify={"center"}
        py={4}
        bg={bgBoxes}
        borderRadius={"15px 15px 0 0"}
        shadow={"md"}
      >
        <Heading color={"teal.400"} size={"lg"}>
          Gestión de usuarios
        </Heading>
      </Flex>
      {data.length === 0 ? (
        <Flex flexDir={"column"} justify={"center"} align={"center"}>
          <Text>
            Este módulo aún no cuenta con registros. Si desea agregar alguno:
          </Text>
          <Button colorScheme="teal" mt={4} onClick={handleAdd}>
            Click aquí
          </Button>
          <Image
            boxSize={{ base: "auto", md: "550px" }}
            objectFit="cover"
            src={noDataTableImage}
          />
          <a
            href="https://www.freepik.com/free-vector/no-data-concept-illustration_5928294.htm#query=no%20data&position=13&from_view=search&track=ais"
            target="_blank"
          >
            <span style={{ fontSize: "12px", color: "gray" }}>
              Image by storyset on Freepik
            </span>
          </a>
          <ModalUser
            isOpen={isOpen}
            onClose={onClose}
            userData={userToEdit}
            refetch={refetch}
          />
        </Flex>
      ) : (
        <>
          <TableWithPagination
            columns={columns}
            data={data}
            handleAdd={handleAdd}
            labelBtn={"usuario"}
          />
          <ModalUser
            isOpen={isOpen}
            onClose={onClose}
            userData={userToEdit}
            refetch={refetch}
          />
          <ModalConfirmation
            isOpen={modalConfirm.isOpen}
            onClose={modalConfirm.onClose}
            message={"¿Estas seguro(a) de eliminar este usuario?"}
            deleteFunction={removeUser}
            idItem={idUserDelete}
          />
        </>
      )}
    </Box>
  );
};

export default AdminUsers;
