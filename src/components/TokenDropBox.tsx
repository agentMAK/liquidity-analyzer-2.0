import { Box, Flex, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const TokenDropBox = (): JSX.Element => {
  return (
    <Box
      bgColor={"black"}
      borderRadius={"50px"}
      mt={"25px"}
      py={"14px"}
      px={"16px"}
      width={"200px"}
    >
      <Flex>
        <Image
          src="/images/tokens/dpi.png"
          alt="Index Coop Logo"
          height={"20px"}
        />
        <Text ml={"12px"} fontSize={"14px"} fontWeight={"500"}>
          DeFi Pulse Index
        </Text>
      </Flex>
    </Box>
  );
};

export default TokenDropBox;
