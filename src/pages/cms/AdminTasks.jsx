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
import { deleteTask, getAllTasks } from "../../api/tasks";
import { useMemo, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalTask from "../../components/ModalTask";
import ModalConfirmation from "../../components/ModalConfirmation";
import noDataTableImage from "../../assets/img/no-data-other.svg";

const AdminTasks = () => {
  //Propiedades para los colores ligh/dark
  let bgBoxes = useColorModeValue("white", "gray.700");

  //Toast de Chakra UI instancia
  const toast = useToast();

  //HOOK PARA CONTROLAR EL MODAL
  const { isOpen, onOpen, onClose } = useDisclosure(); //Hook Para el modal de formulario

  const modalConfirm = useDisclosure(); //Hook modal de conformacion de eliminacion

  const [taskToEdit, setTaskToEdit] = useState({});
  const [idTaskDelete, setIdTaskDelete] = useState(null);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
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
        Header: "Título",
        accessor: "title",
      },
      {
        Header: "Descripción",
        accessor: "description",
        Cell: ({ row }) => `${row.original.description.substring(0, 14)}...`,
      },
      {
        Header: "F. Realizar",
        accessor: "date",
        Cell: ({ row }) => new Date(row.original.date).toLocaleString(),
      },
      {
        Header: "Autor",
        accessor: "autor",
        Cell: ({ row }) =>
          `${row.original.user.names} ${row.original.user.matlastname}`,
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
            <Tooltip label="Editar" hasArrow>
              <Button
                onClick={() => handleEdit(row.original)}
                size={{ base: "sm", md: "md" }}
                colorScheme="blue"
                variant={"ghost"}
                _focus={{ boxShadow: "none" }}
              >
                <EditIcon boxSize={5} />
              </Button>
            </Tooltip>
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
          </HStack>
        ),
      },
    ],
    []
  );

  const handleAdd = () => {
    setTaskToEdit({}); //Setear al estado vacio para que el formulario cargue sin datos en los inputs
    onOpen(); //Abri modal
  };

  const handleEdit = (rowData) => {
    // Lógica para editar el elemento
    //console.log("Edit", rowData);
    setTaskToEdit(rowData);
    onOpen();
  };

  const handleDelete = async (id) => {
    // Lógica para eliminar el elemento
    //console.log("Delete", id);
    setIdTaskDelete(id);
    modalConfirm.onOpen();
  };

  //Delete Task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      //Cerrar modal
      modalConfirm.onClose();

      //Mostrar mensaje de notificacion
      toast({
        title: "success",
        description: "Tarea eliminada correctamente",
        status: "error",
        duration: 2000,
        isClosable: true,
        colorScheme: "teal",
      });

      //Actualizar la lista de tareas
      refetch();

      //Reiniciar estado
      setIdTaskDelete(null);
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
          Gestión de tareas
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
          <ModalTask
            isOpen={isOpen}
            onClose={onClose}
            taskData={taskToEdit}
            refetch={refetch}
          />
        </Flex>
      ) : (
        <>
          <TableWithPagination
            columns={columns}
            data={data}
            handleAdd={handleAdd}
            labelBtn={"tarea"}
          />
          <ModalTask
            isOpen={isOpen}
            onClose={onClose}
            taskData={taskToEdit}
            refetch={refetch}
          />
          <ModalConfirmation
            isOpen={modalConfirm.isOpen}
            onClose={modalConfirm.onClose}
            message={"¿Estas seguro(a) de eliminar esta tarea?"}
            deleteFunction={removeTask}
            idItem={idTaskDelete}
          />
        </>
      )}
    </Box>
  );
};

export default AdminTasks;
