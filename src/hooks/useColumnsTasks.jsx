import { Button, HStack } from "@chakra-ui/react";
import { useMemo } from "react";

export default function useColumnsTasks() {
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
        /*Cell: ({ row }) => `${row.original.description.substring(0, 14)}...`,*/
      },
      {
        Header: "Fecha Realizar",
        accessor: "date",
       /* Cell: ({ row }) => new Date(row.original.date).toLocaleString(),*/
      },
      {
        Header: "Autor",
        accessor: "autor",
        /*Cell: ({ row }) =>
          `${row.original.user.names} ${row.original.user.matlastname}`,*/
      },
      {
        Header: "Fecha Creación",
        accessor: "createdAt",
        /*Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),*/
      },
      {
        Header: "Opciones",
        accessor: "options",
        /*Cell: ({ row }) => (
          <HStack spacing={"10"}>
            <Button variant={"ghost"} onClick={() => console.log(row.original)}>Editar</Button>
            <Button variant={"ghost"} onClick={() => console.log(row)}>Quitar</Button>
          </HStack>
        ),*/
      },
    ],
    []
  );

  return columns;
}
