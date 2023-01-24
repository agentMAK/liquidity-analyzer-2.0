import { formatUnits } from "ethers/lib/utils.js";
import useCoinGeckoPrice from "@hooks/useCoinGeckoPrice";
import useUniswapV3Liquidity from "@hooks/useUniswapV3Liquidity";
import { mulBigNumbers } from "@utils/bigNumbers";
import { WETH } from "@constants/tokens";

function Page() {

  const uniswapV3Liquidity = useUniswapV3Liquidity(
    "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b"
  );
  const coinGeckoTokenPrice = useCoinGeckoPrice(
    "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b"
  );
  const coinGeckoEthPrice = useCoinGeckoPrice(
    WETH
  );

  const tokenLiquidty = mulBigNumbers(uniswapV3Liquidity.data.tokenBalance,coinGeckoTokenPrice.data)
  const ethLiquidty = mulBigNumbers(uniswapV3Liquidity.data.wethBalance,coinGeckoEthPrice.data)
  const poolLiquidity = tokenLiquidty.add(ethLiquidty)


  return (
    <>
      <h1>Fetch on-chain data</h1>
      <p>tokenBalance: {formatUnits(uniswapV3Liquidity.data.tokenBalance || "")}</p>
      <p>wethBalance: {formatUnits(uniswapV3Liquidity.data.wethBalance || "")}</p>
      <p>token Price: {formatUnits(coinGeckoTokenPrice.data || "0")}</p>
      <p>weth Price: {formatUnits(coinGeckoEthPrice.data || "0")}</p>
      <p>token liquidity: {formatUnits(tokenLiquidty)}</p>
      <p>eth liquidity: {formatUnits(ethLiquidty)}</p>
      <p>pool liquidity: {formatUnits(poolLiquidity)}</p>
    </>
  );
}

export default Page;
