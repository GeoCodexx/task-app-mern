import { useEffect, useState } from "react";
import DashboardInfoCards from "../../components/DashboardInfoCards";
import { Box, Flex, Spinner } from "@chakra-ui/react";
//import panelImage from "../../assets/img/control_panel.svg";
import DashboardCharts from "../../components/DashboardCharts";


const Dashboard = () => {

  return (
    <>
      <Box as="main" py={6}>
        <DashboardInfoCards />

        <DashboardCharts />

        {/* <Hide below="md">
          <Flex justify={"center"} alignItems="center" px={4}>
            <Image src={panelImage} boxSize={{xl:"650px", lg:"500px", md:"500px"}} opacity={"0.9"} />
          </Flex>
        </Hide> */}
      </Box>
    </>
  );
};

export default Dashboard;
