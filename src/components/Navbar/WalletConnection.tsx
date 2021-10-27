import React, {useCallback, useState} from "react";
import {
  Flex,
  Text,
  Button,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { IoWalletOutline } from "react-icons/io5";
import { shortenAddress } from "../../utils";
import { injected, ConnectorNames, connectorsByName} from "../../connectors";
import WalletOptions from "./WalletOptions";
import WalletModal from "./modals/walletModal";
import NetworkModal from "./modals/networkModal";
import { useNativeBalance, useRGPBalance } from '../../utils/hooks/useBalances';
import StatusIcon from "./StatusIcon";


export default function WalletConnection() {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const { account, error, activate, connector } = useWeb3React();
  const bg = useColorModeValue('#FFFFFF', '#15202B');
  const bgColor = useColorModeValue('lightBg.100', 'darkBg.100');
  const bgColor2 = useColorModeValue('lightBg.200', 'darkBg.100');
  const bgColor3 = useColorModeValue('#DEE6ED', '#4A739B');
  const shadow = useColorModeValue(
    '0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)',
    '0px 2px 4px -2px rgba(178, 193, 230, 0.12), 0px 4px 4px -2px rgba(178, 193, 230, 0.08)'
  );
  const buttonBorder = useColorModeValue('gray.200', 'gray.100');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Balance, Symbol] = useNativeBalance();
  const [displayWallet,setDisplayWallet] = useState(false);
  const [displayNetwork, setDisplayNetwork] = useState(false);
  const [RGPBalance] = useRGPBalance();

  const connectWallet = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      try {
        activate(connector);
      } catch (e) {
        console.log(e);
      }
    },
    [activate]
  );

  const connectAccount = () => {
    try {
      activate(injected);
    } catch (error) {
      console.log(error);
    }
  };

  if (account) {
    return (
      <>
        <Button
          display={isMobileDevice ? 'none' : undefined}
          variant="rgpButton"
          bg={bgColor}
        >
          {RGPBalance} {RGPBalance ? 'RGP' : '0.0000 RGP'}
        </Button>
        <Flex
          ml={2}
          w={isMobileDevice ? '160px' : '280px'}
          borderRadius="md"
          border={'1px solid'}
          borderColor={bgColor2}
          h="10"
          justify="space-between"
        >
          <Flex
            display={isMobileDevice ? 'none' : undefined}
            align="center"
            justify="center"
            bg={bgColor2}
            px={2}
          >
            <Text ml={2} fontWeight={'bold'}>
              {Balance} {Symbol}
            </Text>
          </Flex>
          <Button
          onClick={() =>setDisplayWallet(state => !state)}
            variant={'ghost'}
            rightIcon={<StatusIcon connector={connector} />}
          >
            {shortenAddress(account)}
          </Button>
        </Flex>
        <WalletModal displayWallet={displayWallet} accounts={account} setDisplayWallet={setDisplayWallet} />
      </>
    );
  } else if (error) {
    return (
      <Button bg="red.300" rightIcon={<IoWalletOutline />} variant="brand">
        {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
      </Button>
    );
  } else {
    return (
      <>
        <Button
          onClick={() =>setDisplayNetwork(state => !state)}
          rightIcon={<IoWalletOutline />}
          variant="brand"
        >
          Connect Wallet
        </Button>
        <NetworkModal displayNetwork={displayNetwork} setDisplayNetwork={setDisplayNetwork} />
      </>
    );
  }
}
