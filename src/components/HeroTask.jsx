import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import heroImage from "../assets/img/post-it-nobg.png";
import { Link } from "react-router-dom";

const HeroTask = () => {
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setYOffset((prevOffset) => (prevOffset === 7 ? -7 : 7));
    }, 1700);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <Box
      bgGradient="linear(to-r, teal.400, teal.500)"
      py={20}
      px={{ base: 4, md: 12 }}
      textAlign={{ base: "center", md: "left" }}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent={{ base: "space-around", md: "space-between" }}
      h={{ base: "calc(100vh - 150px)", md: "calc(100vh - 128px)" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, y: yOffset }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ display: "inline-block" }}
      >
        <img
          src={heroImage}
          alt="Task App Image"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Heading as="h1" size="2xl" color="white" mb={4}>
          Organiza tus tareas de manera eficiente
        </Heading>
        <Text fontSize="lg" color="white" mb={6}>
          Simplifica tu vida con nuestra aplicación de gestión de tareas.
        </Text>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link to="/register">
            <Button
              colorScheme="teal"
              size="lg"
              fontWeight="bold"
              px={8}
              py={4}
              _hover={{ bg: "teal.600" }}
            >
              ¡Comienza ahora!
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default HeroTask;
