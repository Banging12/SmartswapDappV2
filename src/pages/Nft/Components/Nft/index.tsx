import React, { useState } from 'react'
import {
    Box,
    Text,
    Button,
    useColorModeValue,
    Image,
    Flex, Spinner
  } from '@chakra-ui/react';
import ComfirmPurchase from '../../Modals/ComfirmPurchase';
import { Link } from 'react-router-dom';
import { useNft, useNftName} from "../../../../hooks/useNFT";
import {NftProps} from "../../ViewNFT";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useActiveWeb3React} from "../../../../utils/hooks/useActiveWeb3React";
import {SupportedChainId} from "../../../../constants/chains";


export const Nft = function ({ nftName, image, number, id, priceUSD, priceRGP, isFeatured = false }: NftProps) {

  const textColor = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "grey");
  const [ purchaseModal,setOpenPerchaseModal] = useState(false);

  const { firstToken, secondToken ,prices, unsoldItems , nftId} = useNft(id);
    const { chainId } = useActiveWeb3React();

  const {name, nftImage, loading} = useNftName(nftId[0]);

  const rgpPrice = (100.54 * parseFloat(prices.firstTokenPrice)).toFixed(2);

  const data : NftProps = {
      nftName: name,
      image: nftImage,
      priceUSD: prices.firstTokenPrice,
      id: id,
      priceRGP: rgpPrice,
      total: nftId.length,
      unsold: unsoldItems
  };
   
  return (
         <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          borderColor={'#DEE5ED'}
          position="relative"
          >
            <Flex p={2.5} height={'320px'} justifyContent={'center'} alignItems={'center'}>
                {loading ? <Spinner speed="0.65s" color="#333333" /> :  chainId === Number(SupportedChainId.BINANCETEST) || chainId === Number(SupportedChainId.POLYGONTEST) ? (
                    <Image
                        src={nftImage}
                        alt={`Picture`}
                        roundedTop="lg"
                        boxSize={'100%'}
                        rounded="lg"
                    />
                    ) : (
                        <LazyLoadImage src={nftImage} alt={`Picture`} style={{borderRadius: '5%'}} width={'300px'} height={'300px'}/>
                )
                }
            </Flex>
          <Box p="3">
            <Box d="flex" alignItems="baseline">
            <Text
            py={2} 
            color={textColor}
              >
                {name}
              </Text>
            </Box>
            <Flex mt="2" justifyContent="space-between" alignContent="center">
              <Text textColor={lightTextColor}>Sold:</Text>
              <Text  color={textColor}>{unsoldItems - nftId[0]} of {nftId.length}</Text>
            </Flex>
  
            <Flex mt="2" justifyContent="space-between" alignContent="center">
              <Text textColor={lightTextColor}>Price:</Text>
              <Text  color={textColor}>{prices.secondTokenPrice} USD</Text>
            </Flex>
            <Flex mt="2" justifyContent="space-between" alignContent="center">
              <Text/>
              <Text textColor={lightTextColor} >≈ {rgpPrice} RGP</Text>
            </Flex>
            <Flex mt="2" pt={2} justifyContent="space-between" alignContent="center">
              <Button onClick={() => setOpenPerchaseModal(true) } width={40} variant={'brand'}>Buy NFT</Button>
              <Button 
                  ml={2}
                  textColor={'#319EF6'}
                  borderRadius="6px"
                  mb="1.5"
                  borderColor={'#319EF6'}
                  variant='outline'
                  width={40}
              >
                  <Link to={{
                      pathname: `/nfts/${id}`,
                      state: data
                  }}>View NFT</Link>
              </Button>
            </Flex>
            
          </Box>
              <ComfirmPurchase isOpen={purchaseModal}
                               close={()=>setOpenPerchaseModal(false)}
                               id={id}
                               image={nftImage}
                               name={name}
              />
        </Box>
    )
};
export default Nft 
