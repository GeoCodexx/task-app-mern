import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaClipboardList, FaTasks, FaUsers } from "react-icons/fa";
import { getDataInfoCards } from "../api/charts";

const DashboardInfoCards = () => {
  //color fondo
  const bgBox = useColorModeValue("white", "gray.700");
  const bgIcon = useColorModeValue("teal.400", "none");
  const colorIcon = useColorModeValue("white", "teal.300");
  const colorText = useColorModeValue("gray.500", "gray.400");

  const [dataCards, setDataCards] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataInfoCards();
        setDataCards(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={6}
          px={{ base: "4", xl: "15" }}
        >
          <GridItem
            w="100%"
            h="94px"
            bg={bgBox}
            p="22px"
            borderRadius="xl"
            shadow={"md"}
          >
            <Grid templateColumns={"repeat(3, 1fr)"}>
              <GridItem colSpan={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </GridItem>
              <GridItem colSpan={1} mx={"auto"}>
                <SkeletonCircle size="14" />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            w="100%"
            h="94px"
            bg={bgBox}
            p="22px"
            borderRadius="xl"
            shadow={"md"}
          >
            <Grid templateColumns={"repeat(3, 1fr)"}>
              <GridItem colSpan={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </GridItem>
              <GridItem colSpan={1} mx={"auto"}>
                <SkeletonCircle size="14" />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            w="100%"
            h="94px"
            bg={bgBox}
            p="22px"
            borderRadius="xl"
            shadow={"md"}
          >
            <Grid templateColumns={"repeat(3, 1fr)"}>
              <GridItem colSpan={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </GridItem>
              <GridItem colSpan={1} mx={"auto"}>
                <SkeletonCircle size="14" />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            w="100%"
            h="94px"
            bg={bgBox}
            p="22px"
            borderRadius="xl"
            shadow={"md"}
          >
            <Grid templateColumns={"repeat(3, 1fr)"}>
              <GridItem colSpan={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </GridItem>
              <GridItem colSpan={1} mx={"auto"}>
                <SkeletonCircle size="14" />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </>
    );

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
        px={{ base: "4", xl: "15" }}
      >
        {/**FIRT INFOCARD TOTAL USERS */}
        <GridItem
          w="100%"
          h="94px"
          bg={bgBox}
          p="22px"
          borderRadius="xl"
          shadow={"md"}
        >
          <Flex justify="space-between" align="center">
            <Flex flexDirection="column" w={{ base: "110px", md: "auto" }}>
              <Text color={colorText} fontWeight="bold">
                Total Tareas
              </Text>
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                {dataCards.tasks}
              </Text>
            </Flex>
            <Flex
              justify="center"
              align="center"
              bgColor={bgIcon}
              w="52px"
              h="52px"
              borderRadius="lg"
            >
              <Icon as={FaTasks} boxSize={9} color={colorIcon} />
            </Flex>
          </Flex>
        </GridItem>

        {/**SECOND INFOCARD */}
        <GridItem
          w="100%"
          h="94px"
          bg={bgBox}
          p="22px"
          borderRadius="xl"
          shadow={"md"}
        >
          <Flex justify="space-between" align="center">
            <Flex flexDirection="column" w={{ base: "110px", md: "auto" }}>
              <Text color={colorText} fontWeight="bold">
                Total Usuarios
              </Text>
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                {dataCards.users}
              </Text>
            </Flex>
            <Flex
              justify="center"
              align="center"
              bgColor={bgIcon}
              w="52px"
              h="52px"
              borderRadius="lg"
            >
              <Icon as={FaUsers} boxSize={9} color={colorIcon} />
            </Flex>
          </Flex>
        </GridItem>

        {/**THIRD INFOCARD */}
        <GridItem
          w="100%"
          h="94px"
          bg={bgBox}
          p="22px"
          borderRadius="xl"
          shadow={"md"}
        >
          <Flex justify="space-between" align="center">
            <Flex flexDirection="column" w={{ base: "110px", md: "auto" }}>
              <Text color={colorText} fontWeight="bold">
                Total Roles
              </Text>
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                {dataCards.roles}
              </Text>
            </Flex>
            <Flex
              justify="center"
              align="center"
              bgColor={bgIcon}
              w="52px"
              h="52px"
              borderRadius="lg"
            >
              <Icon as={FaClipboardList} boxSize={9} color={colorIcon} />
            </Flex>
          </Flex>
        </GridItem>

        {/**FOURTH INFOCARD */}
        <GridItem
          w="100%"
          h="94px"
          bg={bgBox}
          p="22px"
          borderRadius="xl"
          shadow={"md"}
        >
          <Flex justify="space-between" align="center">
            <Flex flexDirection="column" w={{ base: "110px", md: "auto" }}>
              <Text color={colorText} fontWeight="bold">
                Total Permisos
              </Text>
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                {dataCards.permissions}
              </Text>
            </Flex>
            <Flex
              justify="center"
              align="center"
              bgColor={bgIcon}
              w="52px"
              h="52px"
              borderRadius="lg"
            >
              <Icon as={FaClipboardList} boxSize={9} color={colorIcon} />
            </Flex>
          </Flex>
        </GridItem>
      </Grid>

      {/* <Flex>
        <Flex>
          <Flex></Flex>
          <Icon />
        </Flex>
      </Flex> */}
    </>
  );
};

export default DashboardInfoCards;
