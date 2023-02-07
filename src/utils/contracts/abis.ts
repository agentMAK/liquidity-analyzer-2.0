export const KYBER_ELASTIC_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "uint32", name: "_vestingPeriod", type: "uint32" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldConfigMaster",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newConfigMaster",
        type: "address",
      },
    ],
    name: "ConfigMasterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feeTo",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "governmentFeeUnits",
        type: "uint24",
      },
    ],
    name: "FeeConfigurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_nftManager",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "added", type: "bool" },
    ],
    name: "NFTManagerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_nftManager",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "removed", type: "bool" },
    ],
    name: "NFTManagerRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint24",
        name: "swapFeeUnits",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "tickDistance",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint24",
        name: "swapFeeUnits",
        type: "uint24",
      },
      {
        indexed: true,
        internalType: "int24",
        name: "tickDistance",
        type: "int24",
      },
    ],
    name: "SwapFeeEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "vestingPeriod",
        type: "uint32",
      },
    ],
    name: "VestingPeriodUpdated",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "WhitelistDisabled", type: "event" },
  { anonymous: false, inputs: [], name: "WhitelistEnabled", type: "event" },
  {
    inputs: [{ internalType: "address", name: "_nftManager", type: "address" }],
    name: "addNFTManager",
    outputs: [{ internalType: "bool", name: "added", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "configMaster",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint24", name: "swapFeeUnits", type: "uint24" },
    ],
    name: "createPool",
    outputs: [{ internalType: "address", name: "pool", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint24", name: "swapFeeUnits", type: "uint24" },
      { internalType: "int24", name: "tickDistance", type: "int24" },
    ],
    name: "enableSwapFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint24", name: "", type: "uint24" }],
    name: "feeAmountTickDistance",
    outputs: [{ internalType: "int24", name: "", type: "int24" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeConfiguration",
    outputs: [
      { internalType: "address", name: "_feeTo", type: "address" },
      { internalType: "uint24", name: "_governmentFeeUnits", type: "uint24" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreationCode",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreationCodeContracts",
    outputs: [
      { internalType: "address", name: "contractA", type: "address" },
      { internalType: "address", name: "contractB", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint24", name: "", type: "uint24" },
    ],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWhitelistedNFTManagers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "isWhitelistedNFTManager",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "parameters",
    outputs: [
      { internalType: "address", name: "factory", type: "address" },
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "swapFeeUnits", type: "uint24" },
      { internalType: "int24", name: "tickDistance", type: "int24" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolInitHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_nftManager", type: "address" }],
    name: "removeNFTManager",
    outputs: [{ internalType: "bool", name: "removed", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_configMaster", type: "address" },
    ],
    name: "updateConfigMaster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_feeTo", type: "address" },
      { internalType: "uint24", name: "_governmentFeeUnits", type: "uint24" },
    ],
    name: "updateFeeConfiguration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_vestingPeriod", type: "uint32" },
    ],
    name: "updateVestingPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingPeriod",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "whitelistDisabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];


export const KYBER_FACTORY_ABI = [
    {
      inputs: [
        { internalType: 'address', name: '_feeToSetter', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'contract IERC20',
          name: 'token0',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'contract IERC20',
          name: 'token1',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'ampBps',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalPool',
          type: 'uint256',
        },
      ],
      name: 'PoolCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'feeTo',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint16',
          name: 'governmentFeeBps',
          type: 'uint16',
        },
      ],
      name: 'SetFeeConfiguration',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'feeToSetter',
          type: 'address',
        },
      ],
      name: 'SetFeeToSetter',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'allPools',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'allPoolsLength',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'tokenA', type: 'address' },
        { internalType: 'contract IERC20', name: 'tokenB', type: 'address' },
        { internalType: 'uint32', name: 'ampBps', type: 'uint32' },
      ],
      name: 'createPool',
      outputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'feeToSetter',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getFeeConfiguration',
      outputs: [
        { internalType: 'address', name: '_feeTo', type: 'address' },
        { internalType: 'uint16', name: '_governmentFeeBps', type: 'uint16' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'token0', type: 'address' },
        { internalType: 'contract IERC20', name: 'token1', type: 'address' },
        { internalType: 'uint256', name: 'index', type: 'uint256' },
      ],
      name: 'getPoolAtIndex',
      outputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'token0', type: 'address' },
        { internalType: 'contract IERC20', name: 'token1', type: 'address' },
      ],
      name: 'getPools',
      outputs: [
        { internalType: 'address[]', name: '_tokenPools', type: 'address[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'token0', type: 'address' },
        { internalType: 'contract IERC20', name: 'token1', type: 'address' },
      ],
      name: 'getPoolsLength',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: '', type: 'address' },
        { internalType: 'contract IERC20', name: '', type: 'address' },
      ],
      name: 'getUnamplifiedPool',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'token0', type: 'address' },
        { internalType: 'contract IERC20', name: 'token1', type: 'address' },
        { internalType: 'address', name: 'pool', type: 'address' },
      ],
      name: 'isPool',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_feeTo', type: 'address' },
        { internalType: 'uint16', name: '_governmentFeeBps', type: 'uint16' },
      ],
      name: 'setFeeConfiguration',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_feeToSetter', type: 'address' },
      ],
      name: 'setFeeToSetter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  