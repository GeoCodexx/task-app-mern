import React from "react";
import DashboardInfoCards from "../../components/DashboardInfoCards";
import { Box, Flex, Hide, Image, Text } from "@chakra-ui/react";
import panelImage from "../../assets/img/control_panel.svg";

const Dashboard = () => {
  return (
    <>
      <Box as="main" py={6}>
        <DashboardInfoCards />
        <Hide below="md">
          <Flex justify={"center"} alignItems="center" px={4}>
            <Image src={panelImage} boxSize={{xl:"650px", lg:"500px", md:"500px"}} opacity={"0.9"} />
          </Flex>
        </Hide>
      </Box>
    </>
  );
};

export default Dashboard;
