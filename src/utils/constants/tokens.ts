export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const DEFAULTSLIPPAGE = 0.5;

export type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions?: any;
  coinGeckoId?: string;
  tokenSetId?: string;
};

export type TokenList = Token[];

export const INDEX_TOKENS:TokenList = [
  {
    chainId: 1,
    address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
    name: "DeFi Pulse Index",
    symbol: "DPI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12465/thumb/defi_pulse_index_set.png?1600051053",
    coinGeckoId: "defipulse-index",
    tokenSetId: "dpi",
  },
  {
    chainId: 1,
    address: "0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6",
    name: "Bankless BED Index",
    symbol: "BED",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/17175/thumb/BED_Logo_-_No_border.png?1626833695",
    coinGeckoId: "bankless-bed-index",
    tokenSetId: "bed",
  },
  {
    chainId: 1,
    address: "0x72e364f2abdc788b7e918bc238b21f109cd634d7",
    name: "Metaverse Index",
    symbol: "MVI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/14684/thumb/MVI_logo.png?1617776444",
    coinGeckoId: "metaverse-index",
    tokenSetId: "mvi",
  },
  {
    chainId: 1,
    address: "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84",
    name: "Interest Compounding ETH Index",
    symbol: "ICETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/24483/thumb/icETH-token-logo.png?1647826356",
    coinGeckoId: "interest-compounding-eth-index",
    tokenSetId: "iceth",
  },
  {
    chainId: 1,
    address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd",
    name: "Index Coop   ETH 2x Flexible Leverage I",
    symbol: "ETH2X-FLI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/14392/thumb/ETH2x-FLI_%281%29.png?1615875910",
    coinGeckoId: "index-coop-eth-2x-flexible-leverage-index",
    tokenSetId: "ethfli",
  },
  {
    chainId: 1,
    address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b",
    name: "BTC 2x Flexible Leverage Index",
    symbol: "BTC2X-FLI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/15406/thumb/Copy_of_BTC2x-FLI_token_logo.png?1646749417",
    coinGeckoId: "btc-2x-flexible-leverage-index",
    tokenSetId: "btcfli",
  },
];

export const DEFUALT_TOKEN: Token = {
  chainId: 1,
  address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
  name: "DeFi Pulse Index",
  symbol: "DPI",
  decimals: 18,
  logoURI:
    "https://assets.coingecko.com/coins/images/12465/thumb/defi_pulse_index_set.png?1600051053",
  coinGeckoId: "defipulse-index",
  tokenSetId: "dpi",
};
