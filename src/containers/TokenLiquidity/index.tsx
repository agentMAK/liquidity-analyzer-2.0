import { Box, Flex, Td, Text} from "@chakra-ui/react";
import { Thead, Tbody, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useTokenPoolLiquidity from "@hooks/useTokenPoolLiquidity";
import { WarningIcon } from '@chakra-ui/icons'
import DataFetchingErrorMessage from "@components/DataFetchingErrorMessage";
import { formatCurrency } from "@utils/bigNumbers";


const TokenLiquidityContainer = (props: any): JSX.Element => {

  const tokenPoolSize = useTokenPoolLiquidity(
    "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b"
  );

  return (
    <Box
      {...props}
      width={"100%"}
      border={"1px solid #B9B6FC"}
      height={"500px"}
      borderRadius={"20px"}
    >
      <DataTable>
        <Thead>
          <Tr>
            <DTh>Exchange</DTh>
            <DTh>Pool Size</DTh>
          </Tr>
        </Thead>
        <Tbody>

          <Tr>
            <DTd isLoaded={!tokenPoolSize.isLoading} isError={tokenPoolSize.isError} isTitle={true}>
              Uniswap V3
            </DTd>
            <DTd isLoaded={!tokenPoolSize.isLoading} isError={tokenPoolSize.isError}>
              ${formatCurrency(tokenPoolSize.data)}
            </DTd>
          </Tr>

          


        </Tbody>
      </DataTable>
    </Box>
  );
};

export default TokenLiquidityContainer;
