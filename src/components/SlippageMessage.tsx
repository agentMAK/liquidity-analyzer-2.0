import { WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Link,
  Button,
  IconButton,
  Text,
  Portal,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

const SlippageMessage = (props: any): JSX.Element => {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
  return (
    <Flex color={"white"} textTransform={"none"} mb={"4px"} fontSize={"12px"}>
      <Popover
        placement="bottom-end"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button
            bg={"none"}
            p={"0"}
            h={"fit"}
            fontSize={"12px"}
            _hover={{ bg: "none", textDecoration: "underline" }}
          >
            Slippage Tolerance
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            bgColor={"primary.75"}
            borderColor={"white"}
            width={"400px"}
          >
            <PopoverArrow bgColor={"primary.75"} />
            <PopoverBody>
              <Box
                p={"20px"}
                color={"white"}
                fontWeight={"500"}
                fontSize={"14px"}
              >
                <WarningTwoIcon
                  color={"#B9B6FC"}
                  boxSize={"28px"}
                  mb={"10px"}
                />
                <Text>
                  Slippage does not include fees paid to DEX liquidity
                  providers.{" "}
                  <Text fontWeight={"400"} mt={"5px"}>
                    DEX user interfaces typically show total price impact, which
                    is Slippage + LP fees (ex 0.5% slippage + 0.3% Uniswap LP
                    Fee = 0.8% price impact){" "}
                  </Text>
                </Text>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Link onClick={onToggle}><WarningIcon ml="2px" boxSize={"9px"} color="white" /></Link>
    </Flex>
  );
};

export default SlippageMessage;
