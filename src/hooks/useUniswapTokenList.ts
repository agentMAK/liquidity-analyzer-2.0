import axios from "axios";
import { useQuery } from "react-query";

const useUniswapTokenList = () => {
  const result = useQuery(["uniswapTokenList"], async () => {
    const resp = await axios.get(
      `https://gateway.ipfs.io/ipns/tokens.uniswap.org`
    );
    const ethTokens = resp.data.tokens.filter((token: { chainId: number; }) => token.chainId === 1)
    return ethTokens
  });
  return result
};

export default useUniswapTokenList;
