import { Box, Flex, Text } from "@chakra-ui/react";

const FeeTierIcon = (props:any): JSX.Element => {
  return (
    <Text
        bgColor={"gray.200"}
        height={"100%"}
        px={"6px"}
        borderRadius={"8px"}
        fontSize={"12px"}
        color={"gray.800"}
        fontWeight={"500"}
        ml="10px"
      >
        {props.children}
      </Text>
  );
};

export default FeeTierIcon;
