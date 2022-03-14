import { Box, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'


type comfirmPurchaseModalProps = {
    isOpen: boolean,
    close: () => void
}

const ComfirmPurchase = ({ isOpen, close }: comfirmPurchaseModalProps) => {
    const textColor = useColorModeValue("#333333", "#F1F5F8");

  return (
        <Modal isOpen={isOpen} onClose={close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textColor={'#333333'}>Confirm Purchase</ModalHeader>
                <ModalCloseButton />
                <Divider marginTop={'-1.5'}  borderColor={'#DEE5ED'} />
                <ModalBody>
                    <Box
                        marginTop={4}
                        textAlign="center"
                        borderWidth="1px"
                        borderColor={'#DEE5ED'}
                        padding="25px 0"
                        fontWeight="normal"
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <Image width={54} height={54} src='https://academy-public.coinmarketcap.com/optimized-uploads/6baf17f9b6d84e6992c8d6f220a53d18.png' alt="logo" />
                            <Text paddingTop={3} fontSize={20} color={textColor} >NFT Name</Text>

                            <Text paddingTop={2} textColor={'#333333'} > <span style={{color: '#666666'}}>Created by:</span>  RigelProtocol</Text>
                        </Flex>
                    </Box>
                    <Box
                        padding={3}
                        borderWidth="1px"
                        borderColor={'#DEE5ED'}
                        fontWeight="normal"
                        marginTop={4}
                    >
                        <Flex mt="1" justifyContent="space-between" alignContent="center">


                            <Text color={'#666666'} >Choose token to pay with</Text>
                            <Image width={5} height={5} src='/images/DownVector.svg' />

                        </Flex>
                    </Box>

                    <Box
                        padding={3}
                        borderWidth="1px"
                        borderColor={'#DEE5ED'}
                        fontWeight="normal"
                        marginTop={4}
                    >
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Text color={'#666666'} >Price</Text>
                            <Text textColor={'#333333'}>250 USD</Text>
                        </Flex>
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Text ></Text>
                            <Text color={'#666666'} > ≈ </Text>
                        </Flex>
                    </Box>
                    <Button
            mt={5}
            mb={2}
            w={'full'}
            variant='brand'
            color={'white'}
            boxShadow={'0 5px 20px 0px rgba(24, 39, 75, 0.06),'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Buy now
          </Button>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ComfirmPurchase