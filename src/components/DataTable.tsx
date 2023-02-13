import {
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Td,
  Th,
  Text,
  Box,
} from "@chakra-ui/react";
import DataFetchingErrorMessage from "./DataFetchingErrorMessage";

const DataTable = (props: any): JSX.Element => {
  return (
    <TableContainer {...props}>
      <Table variant="simple">{props.children}</Table>
    </TableContainer>
  );
};

export default DataTable;

export const DTh = (props: any): JSX.Element => {
  return (
    <Th
      py={"24px"}
      fontSize={"14px"}
      fontWeight={"600"}
      color={"black"}
      {...props}
    >
      {props.children}
    </Th>
  );
};

export const DTd = (props: any): JSX.Element => {
  return (
    <Td _groupHover={(props.onHover) ? {bg:'gray.100'} : {}}>
      <Skeleton fadeDuration={1} isLoaded={props.isLoaded}>
        {props.isError ? (
          props.isTitle ? (
            <Flex alignItems={"center"}>
              <DataFetchingErrorMessage />
              <Text ml="6px">{props.children}</Text>{" "}
            </Flex>
          ) : (
            <Flex alignItems={"center"} height={"1.25rem"}>
              <Box
                bgColor={"primary.50"}
                opacity={0.5}
                height={"3px"}
                width={"60%"}
                borderRadius={"3px"}
              />
            </Flex>
          )
        ) : (
          props.children
        )}
      </Skeleton>
    </Td>
  );
};

DTd.defaultProps = {
  isLoaded: true,
  isError: false,
  isTitle: false,
  children: 'Loading..',
  onHover: true,
};
