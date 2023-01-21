import useUniswapV3Liquidity from "../hooks/useUniswapV3Liquidity"

function Page() {

  const {data, isError, isLoading } = useUniswapV3Liquidity("0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b")
  console.log(data)


  return (
    <>
      <h1>Fetch on-chain data</h1>

    </>
  )
}

export default Page
