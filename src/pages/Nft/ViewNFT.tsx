import React, { useState } from "react"
import {Button,
    Center, Flex, Grid,
    GridItem, Image, Stack,
    Text, useColorModeValue } from '@chakra-ui/react';
import {ArrowBackIcon} from "@chakra-ui/icons";
import ComfirmPurchase from "./Modals/ComfirmPurchase";
import ClaimNFTModal from "./Modals/ClaimNFTModal";
import PolygonImage from '../../assets/polygon-logo.svg';
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {useActiveWeb3React} from "../../utils/hooks/useActiveWeb3React";
import {SupportedChainId} from "../../constants/chains";

export type NftProps = {
    nftName: string,
    image: string,
    isFeatured?: boolean,
    id: number,
    priceUSD?: string,
    priceRGP?: string,
    number?: string,
    total: number,
    unsold: number
};



export const ViewNFT = function () {
    const [purchaseModal, setOpenPerchaseModal] = useState(false);
    const [clamModal, setOpenClamModal] = useState(false);

    const { chainId } = useActiveWeb3React();

    const location = useLocation();
    const state: NftProps = location.state;
    console.log(state);

    const textColor = useColorModeValue("#333333", "#F1F5F8");
    const lightTextColor = useColorModeValue("#666666", "grey");
    return (
        <>
            <Link to={'/nft'}>
                <Flex alignItems={'center'} p={'40px'}>
                    <ArrowBackIcon w={6} h={6}/>
                    <Text fontSize={'20px'}>Back</Text>
                </Flex>
            </Link>

            <Center py={8} marginBottom={8}>
                <Stack
                    w={{ sm: '100%', md: '540px', lg: '950px' }}
                    direction={{ base: 'column', md: 'row' }}
                    bg={useColorModeValue('white', 'gray.900')}
                    p={2}
                >
                    <Flex flex={1} >
                        <Image
                            borderRadius="lg"
                            objectFit="cover"
                            boxSize="100%"
                            src={state.image}
                        />
                    </Flex>
                    <Stack
                        flex={1}
                        pl={10}
                        paddingRight={5}
                    >
                        <Text color={textColor} fontSize={30} fontWeight={700}>
                           {state.nftName}
                        </Text>
                        <Flex mt="1" justifyContent="space-between" alignContent="center">


                            <Grid
                                templateRows='repeat(1, 1fr)'
                                templateColumns='repeat(5, 1fr)'
                            >
                                <GridItem rowSpan={2}   ><Image mt={3} src="/images/cirlce.png" /> </GridItem>
                                <GridItem colSpan={2}  ><Text color={lightTextColor} >Creator</Text> </GridItem>
                                <GridItem colSpan={4}  ><Text color={textColor}  >Rigel Protocol</Text> </GridItem>
                            </Grid>
                            <Flex
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <Text color={lightTextColor}>Number</Text>
                                <Text color={textColor}>{state.unsold}</Text>
                            </Flex>
                        </Flex>
                        <Text mt={2}>
                            The Rigelprotocol NFTs enable users to earn  high dispute fee up to tier B from our platform!
                            These NFTs also give its holders the ability to mine various popular cryptos like MOBOX, SXP, SHIB, CAKE.
                         </Text>

                        <Grid pt={4} templateColumns='repeat(5, 2fr)' gap={0}>
                            <GridItem colSpan={1}   >
                                <Text color={lightTextColor}>Blockchain</Text>
                            </GridItem>
                            <GridItem colStart={3} colEnd={6}>   <Text color={lightTextColor}>Investment to claim</Text>
                            </GridItem>
                            <GridItem colSpan={1} >
                                {
                                    chainId === SupportedChainId.BINANCETEST || chainId === SupportedChainId.BINANCE ? (
                                        <Flex mt="1" alignContent="center">
                                            <Text fontWeight={400} color={textColor} >BSC</Text>
                                            <Image ml={2} alt="bsc" src="/images/binance.svg" />
                                        </Flex>
                                    ) : (
                                        <Flex mt="1" alignItems="center">
                                            <Text fontWeight={400} color={textColor}>Polygon</Text>
                                            <Image boxSize={'25px'} alt="polygon" src={PolygonImage} />
                                        </Flex>
                                    )

                            }
                            </GridItem>
                            <GridItem colStart={3} colEnd={6}>
                                <Text fontWeight={400} color={textColor}>NIL</Text>
                            </GridItem>
                            <GridItem colSpan={2} pt={2} >
                                <Text color={lightTextColor}>Appraised Value</Text>
                            </GridItem>
                            <GridItem colStart={3} pt={2} colEnd={6}><Text color={lightTextColor}>Total Supply</Text>
                            </GridItem>

                            <GridItem colSpan={2} >
                                <Text color={textColor} fontWeight={400}>750 USD</Text>
                            </GridItem>
                            <GridItem  color={textColor} colStart={3} colEnd={6}><Text fontWeight={400} >{state.total}</Text>
                            </GridItem>
                        </Grid>
                        <Flex pt={5} mt="1" justifyContent="space-between" alignContent="center">
                            <Text align={'left'} color={lightTextColor}>  Price    </Text>
                            <Text color={lightTextColor} >  ≈</Text>
                        </Flex>
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Text color={textColor} fontWeight={700} fontSize={28}>
                                {state.priceUSD} USD
                            </Text>
                            <Text color={lightTextColor}>
                                {state.priceRGP} RGP
                            </Text>
                        </Flex>
                        <Flex t="1" pt={3} justifyContent="space-between" alignContent="center">
                            <Button onClick={() => setOpenPerchaseModal(true)} width={'45%'} variant={'brand'}>Buy NFT</Button>
                            <Button
                                textColor={'#319EF6'}
                                borderRadius="6px"
                                borderColor={'#319EF6'}
                                variant='outline'
                                width={'45%'}
                                onClick={() => setOpenClamModal(true)}
                                disabled={true}
                            >
                                Claim NFT</Button>
                        </Flex>

                    </Stack>
                </Stack>
            </Center>
            <ComfirmPurchase isOpen={purchaseModal} close={() => setOpenPerchaseModal(false)} id={state.id} image={state.image} name={state.nftName}/>
            <ClaimNFTModal isOpen={clamModal} close={() => setOpenClamModal(false)} />

        </>
    )
};
export default ViewNFT

