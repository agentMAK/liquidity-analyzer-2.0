import { useQuery } from "react-query";
import axios from "axios";
import { ethers } from "ethers";

const useCoinGeckoPrices = (tokenAddresses: string[]) => {
  
  const fetchPrices = async (tokenAddresses:string[]) => {
    const formattedIds = tokenAddresses.map((address) => address.toLowerCase()).join(",");

    const resp = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${formattedIds}&vs_currencies=usd`
    );

    let usdPrices: any = {};
    tokenAddresses.map((address) => { usdPrices[address] = ethers.utils.parseUnits(resp.data[address.toLowerCase()].usd.toString()) });

    return usdPrices;
  };

  return useQuery({
    queryKey: ['coinGeckoPrices', tokenAddresses],
    queryFn: () => fetchPrices(tokenAddresses),
    enabled: tokenAddresses.length > 0,
    refetchOnWindowFocus: false,
  });

};

export default useCoinGeckoPrices;
