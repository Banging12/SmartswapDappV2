import React, { useState, useEffect } from 'react';
import { Box, Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import ShowDetails from './components/details/ShowDetails';
import SendToken from './components/sendToken/index';
import History from './components/history/History';
import BridgeCard from './components/bridgeCard';
import WelcomeModal from '../../components/Onboarding/WelcomeModal';
import Joyride from 'react-joyride'
import { tourSteps } from '../../components/Onboarding/SwapSteps';

const Swap = () => {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [run, setRun] = useState(false)
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");

  useEffect(() => {
    const visits = window.localStorage.getItem('fiirstSwapVisit');
    if (!visits) {
      setWelcomeModal(true);
      window.localStorage.setItem('fiirstSwapVisit', '1');
    }
  }, []);

  function strartWelcomeRide() {
    setRun(true)
  }

  return (
    <>
      <Joyride
        steps={tourSteps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            textColor: '#FFFFFF',
            primaryColor: bgColor
          }
        }}

      />
      <WelcomeModal startToure={strartWelcomeRide} openModal={welcomeModal}
                    closeModal={() => setWelcomeModal((state) => !state)}
                    textHeader={'Welcome to RigelProtocol SmartSwap'}
                    welcomeText="We would like to get you introduced to this platform and help you find your way around it.
                     If you’d love that, then take this short tour." />
      <Box fontSize="xl">
        <Flex
          minH="100vh"
          zIndex={1}
          mt={6}
          justifyContent="center"
          flexWrap="wrap"
        >
          {isMobileDevice ? (
            <Box mb="110px">
              <Box mx={4} mt={8} w={['100%', '100%', '45%', '29.5%']} mb={4}>
                <SendToken />
                <BridgeCard />
              </Box>

              <Box mx={4} w={['100%', '100%', '45%', '29.5%']} mb={4}  >
                <ShowDetails />
              </Box>

              <Box mx={4} w={['100%', '100%', '45%', '29.5%']} mb={4}>
                <History />
              </Box>
            </Box>
          ) : (
            <>
              <Box mx={4} w={['100%', '100%', '45%', '29.5%']} mb={4}>
                <ShowDetails />
              </Box>

              <Box mx={4} w={['100%', '100%', '45%', '29.5%']} mb={4}>
                <SendToken />
                <BridgeCard />
              </Box>

              <Box mx={5} w={['100%', '100%', '45%', '29.5%']} mb={4}>
                <History />
              </Box>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Swap;
