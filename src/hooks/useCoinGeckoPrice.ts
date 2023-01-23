import { useQuery } from "react-query";
import axios from "axios";
import { ethers } from "ethers";

const useCoinGeckoPrice = (tokenAddress:string) => {
  const result = useQuery(["tokenPrice",tokenAddress], async () => {
    const resp = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    const usdPrice = ethers.utils.parseUnits(resp.data[tokenAddress.toLowerCase()].usd.toString());

    return usdPrice;
  });
  return result;
};

export default useCoinGeckoPrice;
