import { Box, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";

const MaxTradeTableBlank = (): JSX.Element => {
  return (
    <Box
      border={"1px solid #B9B6FC"}
      height={"500px"}
      borderRadius={"20px"}
      width={"35%"}
    >
      <DataTable>
        <Thead>
          <Tr>
            <DTh>Max Trade Size</DTh>
            <DTh>USD Value</DTh>
          </Tr>
        </Thead>
        <Tbody>
          {Array(4).fill(null).map((_,index) => {
            return (
              <Tr key={index}>
                <DTd isLoaded={false}>Blank</DTd>
                <DTd isLoaded={false}>Blank</DTd>
              </Tr>
            );
          })}
        </Tbody>
      </DataTable>
    </Box>
  );
};

export default MaxTradeTableBlank;
