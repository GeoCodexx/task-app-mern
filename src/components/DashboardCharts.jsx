import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  //RadialLinearScale,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
//import { PolarArea } from "react-chartjs-2";
import { Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  //RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Usuarios",
    },
  },
};

export const optionsLineTwo = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Tareas",
    },
  },
};

const labelsLine = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const dataLine = {
  labels: labelsLine,
  datasets: [
    {
      fill: true,
      label: "Usuarios",
      data: [20, 45, 50, 10, 75, 100, 200, 300, 350, 200, 400, 700],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataLineGreen = {
  labels: labelsLine,
  datasets: [
    {
      fill: true,
      label: "Tareas",
      data: [20, 45, 50, 10, 75, 100, 200, 300, 350, 200, 400, 700].reverse(),
      borderColor: "rgb(74, 192, 192)",
      backgroundColor: "rgba(74, 192, 192, 0.5)",
    },
  ],
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Roles",
    },
  },
};

export const optionsBarTwo = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Permisos",
    },
  },
};

export const dataPie = {
  labels: ["Usuarios", "Tareas", "Roles", "Permisos"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Resúmen informativo",
    },
  },
};

const labelsBar = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const dataBar = {
  labels: labelsBar,
  datasets: [
    {
      label: "Roles",
      data: [10, 70, 30, 80, 5, 20, 40, 10, 100, 35, 60, 90],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const dataBarTwo = {
  labels: labelsBar,
  datasets: [
    {
      label: "Permisos",
      data: [10, 70, 30, 80, 5, 20, 40, 10, 100, 35, 60, 90].reverse(),
      backgroundColor: "rgba(255, 206, 86, 0.7)",
    },
  ],
};

const DashboardCharts = () => {
  const boxColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        templateRows={{ base: "repeat(3, 1fr)", md: "repeat(2, 1fr)" }}
        gap={4}
        px={4}
        py={6}
        h={"calc(100vh-100px)"}
        mb={14}
      >
        <GridItem
          m={"auto"}
          colSpan={1}
          rowSpan={2}
          bg={boxColor}
          rounded={"lg"}
          p={{ base: 1, md: 6 }}
          h={{ base: "300px", md: "calc((100vh + 192px) / 2)" }}
        >
          <Flex justify={"center"} align={"center"} h={"full"}>
            <Pie data={dataPie} options={optionsPie} />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg={boxColor}
          rounded={"lg"}
          px={{ base: 1, md: 6 }}
          h={{ base: "auto", md: "calc((100vh+ 160px) / 4)" }}
        >
          <Flex justify={"center"} align={"center"}>
            <Line options={optionsLine} data={dataLine} />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg={boxColor}
          rounded={"lg"}
          px={{ base: 1, md: 6 }}
          h={{ base: "auto", md: "calc((100vh+ 160px) / 4)" }}
        >
          <Flex justify={"center"} align={"center"}>
            <Line options={optionsLineTwo} data={dataLineGreen} />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg={boxColor}
          rounded={"lg"}
          px={{ base: 1, md: 6 }}
          h={{ base: "auto", md: "calc((100vh+ 160px) / 4)" }}
        >
          <Flex justify={"center"} align={"center"}>
            <Bar options={optionsBar} data={dataBar} />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg={boxColor}
          rounded={"lg"}
          px={{ base: 1, md: 6 }}
          h={{ base: "auto", md: "calc((100vh+ 160px) / 4)" }}
        >
          <Flex justify={"center"} align={"center"}>
            <Bar options={optionsBarTwo} data={dataBarTwo} />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default DashboardCharts;
