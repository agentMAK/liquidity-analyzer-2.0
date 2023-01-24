import { Box, Button, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const NavItem = (props: any): JSX.Element => {
  return (
    <Button
      bgColor={"primary.50"}
      textColor={"#EEEEEE"}
      fontWeight={"500"}
      fontSize={"14px"}
      px={"16px"}
      py={"12px"}
      borderRadius={"50px"}
      _hover={{bgColor:"primary.75"}}
      _disabled={{bgColor:"primary.50",opacity:0.4,cursor:"not-allowed"}}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const Header = (): JSX.Element => {
  return (
    <Box bg={"black"} width={"100%"} height={"100px"}>
      <Flex
        height={"100%"}
        textColor={"white"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"30px"}
      >
        <Image
          src="/images/index-logo.png"
          alt="Index Coop Logo"
          height={"48px"}
        />
        <Flex gap={"20px"}>
          <NavItem>Token Liquidity</NavItem>
          <NavItem isDisabled>Index Liquidity</NavItem>
          <NavItem isDisabled>NAV Analyzer</NavItem>
        </Flex>
        <Box></Box>
      </Flex>
    </Box>
  );
};

export default Header;
