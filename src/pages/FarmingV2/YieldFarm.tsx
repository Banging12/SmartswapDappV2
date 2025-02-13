import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Spinner,
  Text,
  Img,
  Stack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import ShowYieldFarmDetails from "./ShowYieldFarmDetails";
import { useColorModeValue } from "@chakra-ui/react";
import { RGPIcon } from "./Icon";
import { LIGHT_THEME, DARK_THEME } from "./index";
import { useWeb3React } from "@web3-react/core";
import Darklogo from "../../assets/rgpdarklogo.svg";
import { useFetchYieldFarmDetails } from "../../state/newfarm/hooks";
// import { Skeleton } from "@chakra-ui/react";
// import "react-loading-skeleton/dist/skeleton.css";

const YieldFarm = ({
  content,
  content2,
  farmDataLoading,
  wallet,
  URLReferrerAddress,
  LoadingState,
  section,
}: {
  content?: {
    pid: number;
    id: string;
    totalLiquidity: string;
    earn: string;
    img: string;
    ARYValue: string;
    lpSymbol: string;
    tokensStaked: string[];
    availableToken: string;
    deposit: string;
    poolAllowance: any;
    RGPEarned: string;
    poolVersion: number | string;
  };
  farmDataLoading: boolean;
  content2?: {
    id: number | undefined;
    img: string;
    deposit: string;
    symbol0: string;
    symbol1: string;
    earn: string;
    type: string;
    totalLiquidity: number;
    APY: number;
    address: string;
  };
  wallet: any;
  URLReferrerAddress: string;
  LoadingState: boolean;
  section: string;
}) => {
  const mode = useColorModeValue(LIGHT_THEME, DARK_THEME);
  const { chainId, library } = useWeb3React();
  const active = chainId && library;
  const [showYieldfarm, setShowYieldFarm] = useState(false);

  const formatAmount = (value: any) => parseFloat(value).toLocaleString();

  const totalLiquidityValue = () => {
    if (farmDataLoading) return <Spinner speed='0.65s' color='#333333' />;

    if (content.totalLiquidity) {
      return ` ${formatAmount(content.totalLiquidity)}`;
    }
  };

  // console.log(loading);

  return (
    <>
      <Flex
        justifyContent='space-between'
        flexDirection={["column", "column", "row"]}
        border='1px solid #DEE5ED'
        background={
          mode === LIGHT_THEME
            ? "#FFFFFF !important"
            : mode === DARK_THEME
            ? "#15202B !important"
            : "#FFFFFF !important"
        }
        color={
          mode === LIGHT_THEME
            ? "#333333"
            : mode === DARK_THEME
            ? "#DCE5EF"
            : "#333333"
        }
        borderColor={
          mode === LIGHT_THEME
            ? "#F2F5F8 !important"
            : mode === DARK_THEME
            ? "#213345 !important"
            : "#F2F5F8 !important"
        }
        padding='15px 20px'
        width={["100%", "100%", "100%"]}
      >
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Deposit
          </Box>
          <Box marginTop='15px' align='left'>
            {content?.type === "RGP" ? content.deposit : content2?.deposit}
          </Box>
        </Flex>
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Earn
          </Box>
          <Flex
            justifyContent='space-between'
            marginTop='15px'
            paddingLeft='30px'
            // align='left'
            alignItems='center'
          >
            {/* <RGPIcon />  */}
            <Img w='24px' src={Darklogo} />{" "}
            <Text marginLeft='10px'>
              {content?.type === "RGP" ? content.earn : content2?.earn}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent='space-between' width='100%'>
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            APY
          </Box>
          <Box marginTop='15px' paddingLeft='50px' align='left'>
            {content?.type === "RGP"
              ? `${formatAmount(content.ARYValue)}%`
              : `${content2?.APY.toFixed(2)}%`}
          </Box>
        </Flex>
        <Flex
          justifyContent='space-between'
          width='100%'
          marginBottom={["10px", "10px", "0"]}
        >
          <Box
            marginTop='15px'
            align='left'
            display={["block", "block", "none"]}
            opacity='0.5'
          >
            Total Liquidity
          </Box>
          <Box marginTop='15px' paddingLeft='65px' align='right'>
            ${" "}
            {content?.type === "RGP"
              ? totalLiquidityValue()
              : content2?.totalLiquidity.toFixed(2)}
          </Box>
        </Flex>
        <Box align='right' mt={["4", "0"]} ml='2'>
          {/* {Number(content.pid) === 1 ? (
            <Button
              w={["100%", "100%", "146px"]}
              h='40px'
              border='2px solid #319EF6'
              background={
                mode === LIGHT_THEME && active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && active
                  ? "#319EF6 !important"
                  : mode === LIGHT_THEME && !active
                  ? "#FFFFFF !important"
                  : mode === DARK_THEME && !active
                  ? "#15202B !important"
                  : "#FFFFFF !important"
              }
              color={
                mode === LIGHT_THEME && active
                  ? "#319EF6"
                  : mode === DARK_THEME && active
                  ? "#FFFFFF"
                  : mode === LIGHT_THEME && !active
                  ? "#319EF6"
                  : mode === DARK_THEME && !active
                  ? "#4CAFFF"
                  : "#333333"
              }
              borderColor={
                mode === LIGHT_THEME && active
                  ? "#4CAFFF !important"
                  : mode === DARK_THEME && active
                  ? "#319EF6 !important"
                  : mode === LIGHT_THEME && !active
                  ? "#4CAFFF !important"
                  : mode === DARK_THEME && !active
                  ? "#4CAFFF !important"
                  : "#319EF6 !important"
              }
              borderRadius='6px'
              mb='4'
              _hover={{ color: "#423a85" }}
              onClick={() => setShowYieldFarm(!showYieldfarm)}
              className={"unlock"}
            >
              Unlock
            </Button> */}
          {/* // ) : ( */}
          <Button
            w={["100%", "100%", "146px"]}
            h='40px'
            border='2px solid #319EF6'
            background={
              mode === LIGHT_THEME && active
                ? "#FFFFFF !important"
                : mode === DARK_THEME && active
                ? "#319EF6 !important"
                : mode === LIGHT_THEME && !active
                ? "#FFFFFF !important"
                : mode === DARK_THEME && !active
                ? "#15202B !important"
                : "#FFFFFF !important"
            }
            color={
              mode === LIGHT_THEME && active
                ? "#319EF6"
                : mode === DARK_THEME && active
                ? "#FFFFFF"
                : mode === LIGHT_THEME && !active
                ? "#319EF6"
                : mode === DARK_THEME && !active
                ? "#4CAFFF"
                : "#333333"
            }
            borderColor={
              mode === LIGHT_THEME && active
                ? "#4CAFFF !important"
                : mode === DARK_THEME && active
                ? "#319EF6 !important"
                : mode === LIGHT_THEME && !active
                ? "#4CAFFF !important"
                : mode === DARK_THEME && !active
                ? "#4CAFFF !important"
                : "#319EF6 !important"
            }
            borderRadius='6px'
            mb='4'
            _hover={{ color: "#423a85" }}
            onClick={() => setShowYieldFarm(!showYieldfarm)}
            className={"unlock"}
          >
            Unlock
          </Button>
          {/* )} */}
        </Box>
      </Flex>
      {showYieldfarm && (
        // <Stack>
        //   <Skeleton height='20px' />
        //   <Skeleton height='20px' />
        //   <Skeleton height='20px' />
        //   <Skeleton height='20px' />
        // </Stack>
        // <Skeleton>
        <ShowYieldFarmDetails
          content={content?.type === "RGP" ? content : content2}
          // content2={content2}
          LoadingState={LoadingState}
          section={section}
          // content2={content2}
          // showYieldfarm={loading}
          wallet={wallet}
          URLReferrerAddress={URLReferrerAddress}
        />
        // </Skeleton>
      )}
    </>
  );
};

export default YieldFarm;
