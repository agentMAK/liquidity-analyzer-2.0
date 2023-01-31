import useCoinGeckoMarketData from "./useCoinGeckoMarketData";
import { INDEX_TOKENS } from "@utils/constants/tokens";

const useCoinGeckoTotalMarketCap = () => {

const {data,isLoading,isError} = useCoinGeckoMarketData(Object.values(INDEX_TOKENS).map((token) => token.coinGeckoId));
let totalMarketCap = 0;

Object.values(data).map((token:any) => {
  totalMarketCap += parseInt(token.market_cap)
})

return {
  data: totalMarketCap,
  isLoading: isLoading,
  isError: isError,
}

};

export default useCoinGeckoTotalMarketCap;
