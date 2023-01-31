export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const DEFAULTSLIPPAGE = 0.5;

export type TokenList = {
  [key: string]: {
    name: string;
    symbol: string;
    address: string;
    imageSrc: string;
    coinGeckoId?: string;
  };
}

export const TOKEN_LIQUIDITY_LIST = {
  DPI: {
    name: "DeFi Pulse Index",
    symbol: "DPI",
    address: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    imageSrc: "/images/tokens/dpi.png",
  },
  BED: {
    name: "Bankless BED Index",
    symbol: "BED",
    address: "0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6",
    imageSrc: "/images/tokens/bed.png",
  },

  MVI: {
    name: "Metaverse Index",
    symbol: "MVI",
    address: "0x72e364f2abdc788b7e918bc238b21f109cd634d7",
    imageSrc: "/images/tokens/mvi.png",
  },
  'ETH2X-FLI': {
    name: "ETH 2x Flexible Leverage Index",
    symbol: "ETH2X-FLI",
    address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd",
    imageSrc: "/images/tokens/ETH2X-FLI.png",
  },
  'BTC2X-FLI': {
    name: "BTC 2x Flexible Leverage Index",
    symbol: "BTC2X-FLI",
    address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b",
    imageSrc: "/images/tokens/BTC2x-FLI.png",
  },
  DSETH: {
    name: "Diversified Staked ETH",
    symbol: "DSETH",
    address: "0x341c05c0e9b33c0e38d64de76516b2ce970bb3be",
    imageSrc: "/images/tokens/dsETH.png",
  },
  ICETH: {
    name: "Interest Compounding ETH Index",
    symbol: "ICETH",
    address: "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84",
    imageSrc: "/images/tokens/icETH.png",
  },
  INDEX: {
    name: "Index Cooperative",
    symbol: "INDEX",
    address: "0x0954906da0bf32d5479e25f46056d22f08464cab",
    imageSrc: "/images/tokens/index.png",
  },
};

export const INDEX_TOKENS = {
  DPI: {
    name: "DeFi Pulse Index",
    symbol: "DPI",
    address: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    imageSrc: "/images/tokens/dpi.png",
    coinGeckoId: "defipulse-index",
  },
  BED: {
    name: "Bankless BED Index",
    symbol: "BED",
    address: "0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6",
    imageSrc: "/images/tokens/bed.png",
    coinGeckoId: "bankless-bed-index",
  },

  MVI: {
    name: "Metaverse Index",
    symbol: "MVI",
    address: "0x72e364f2abdc788b7e918bc238b21f109cd634d7",
    imageSrc: "/images/tokens/mvi.png",
    coinGeckoId: "metaverse-index",
  },
};
