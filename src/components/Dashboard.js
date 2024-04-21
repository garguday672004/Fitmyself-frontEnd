import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Button,
  Image,
  Avatar,
  Text,
  useColorMode,
  Stack,
  Link,
} from "@chakra-ui/react";
import Logo from "../fitness.png";
import { useNavigate } from "react-router-dom";
import HealthStatsCard from "./HealthStatsCard";
import ActivityCard from "./ActivityCard";
import FatGraph from "./FatGraph";
import Loading from "./Loader";

const Dashboard = () => {
  const [fitnessData, setFitnessData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  // const [streak, setstreak] = useState(null);
  let result;

  const [loginCounter, setLoginCounter] = useState(0);
  
  useEffect(() => {
    setIsLoading(true);
    // ----------------------------

    setTimeout(() => {
      axios.get("https://fitmyself-be.vercel.app/")
        .then((response) => {
          // Handle the retrieved loginCounter value
          console.log(response.data); // Assuming loginCounter is returned as response.data
          // Further handling of loginCounter value as neede
          setLoginCounter(response.data.count);
        })
        .catch((error) => {
          // Handle error if any
          console.error('Error fetching loginCounter:', error);
        });
    }, 3000); 

    // ----------------------------

    setTimeout(() => {
      axios.get("https://fitmyself-be.vercel.app/").then((response) => {
        // Handle the retrieved data
        //  console.log(response.data);
        setFitnessData(response.data);
        setIsLoading(false);
      });
    }, 3000);
  }, []);

  if (fitnessData) {
    // console.log(fitnessData.formattedData);
    result = fitnessData?.formattedData.map(({ date, step_count }) => {
      const trimmeddate = date.substr(0, 3);
      return { date: trimmeddate, step_count };
    });
  }

  const handleLogout = () => {
    navigate("/");
  };

  const handleVoiceCheckIn = () => {
    navigate("/voice-check-in"); //where should this navigate to?
  };

  const handleClick = () => {
    navigate("/about"); // Replace "/another-page" with the desired URL
  };
  const handleClick1 = () => {
    navigate("/contact"); // Replace "/another-page" with the desired URL
  };

  const glucose = fitnessData?.formattedData.map((item) => ({
    glucose_level: item.glucose_level,
  }));

  const fat = fitnessData?.formattedData.map((item) => ({
    body_fat_in_percent: item.body_fat_in_percent,
  }));

  const maxWeight = fitnessData?.formattedData.reduce(
    (max, item) => (item.weight > max ? item.weight : max),
    0
  );
  const maxHeight = fitnessData?.formattedData.reduce(
    (max, item) => (item.height_in_cms > max ? item.height_in_cms : max),
    0
  );

  let maxBPArray = [];

  fitnessData?.formattedData.forEach((item) => {
    const itemMaxBP = Math.max(...item.blood_pressure);
    if (itemMaxBP > Math.max(...maxBPArray)) {
      maxBPArray = item.blood_pressure;
    }
  });

  const StepCount = fitnessData?.formattedData.reduce(
    (max, item) => (item.step_count > max ? item.step_count : max),
    0
  );
  const heartrate = fitnessData?.formattedData.reduce(
    (max, item) => (item.heart_rate > max ? item.heart_rate : max),
    0
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Box
            bg={colorMode === "light" ? "teal.500" : "pink.800"}
            px={4}
            py={2}
            color="white"
          >
            <Flex align="center" justify="space-between">
              <Flex align="center">
                {/* create a streak type system which is updated at every entry exit combination*/}

                <Image
                  src={Logo}
                  alt="Fitness Tracker Logo"
                  width="50px"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold">
                  FitMyself
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Avatar
                  size="sm"
                  name="John Doe" // Replace "userData?.name" with the actual property that contains the user's name in the API response data or the user's Google account
                  src={fitnessData?.profilePhoto}
                  mr={2}
                />
                <Text fontWeight="bold">{fitnessData?.userName}</Text>
                <Text fontWeight="bold" style={{marginLeft: '10px', color: 'yellow'}}>$treak: {loginCounter}</Text>

                {/* <Box textAlign="center" mt={2}>
                  <Text>$treak: {loginCounter}</Text>
                </Box> */}

                <Button
                  colorScheme={colorMode === "light" ? "white" : "blue"}
                  variant="outline"
                  size="sm"
                  ml={4}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  colorScheme={colorMode === "light" ? "white" : "blue"}
                  variant="outline"
                  size="sm"
                  ml={4}
                  onClick={toggleColorMode}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Flex>
            <Box
              w="20%"
              h="110vh"
              p={4}
              bg={colorMode === "light" ? "gray.100" : "gray.700"}
            >
              <Stack spacing={7}>
                <Link
                  href="#"
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  onClick={handleVoiceCheckIn}
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  Voice Check-In
                </Link>
                <Link
                  href="http://localhost:8501"
                  // onClick={handleClick}
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  GymHelp AI
                </Link>
                <Link
                  href="#"
                  onClick={handleClick}
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  onClick={handleClick1}
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  Contacts
                </Link>
                <Link
                  href="https://forms.gle/pD2Srtuk29oJ17M77"
                  color={colorMode === "light" ? "teal.500" : "white"}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                  as="a"
                  _notLast={{ mb: 2 }}
                >
                  Withdraw Money
                </Link>
              </Stack>
            </Box>
            <Flex direction="column" w="80%" p={4}>
              <Stack spacing={4}>
                <HealthStatsCard
                  weight={maxWeight}
                  height={maxHeight}
                  BP={maxBPArray}
                  step={StepCount}
                  heart={heartrate}
                />
                <ActivityCard result={result} glucose={glucose} />
                <FatGraph fat={fat} />
              </Stack>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
