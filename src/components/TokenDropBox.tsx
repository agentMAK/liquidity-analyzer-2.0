import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,
} from "@choc-ui/chakra-autocomplete";

import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Image,
  createIcon,
} from "@chakra-ui/react";
import { TokenList, TOKEN_LIQUIDITY_LIST } from "@utils/constants/tokens";
import { useEffect, useState } from "react";

type TokenDropBoxProps = {
  tokenList: TokenList;
  setToken: (token: string) => void;
};

const TokenDropBox = ({
  tokenList,
  setToken,
}: TokenDropBoxProps): JSX.Element => {
  const searchIcon = (
    <Icon boxSize="16px" viewBox="0 0 24 24" focusable="false">
      <path
        fill="currentColor"
        d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
      ></path>
    </Icon>
  );

  const [inputText, setInputText] = useState("");
  const [menuIcon, setMenuIcon] = useState<JSX.Element>(searchIcon);

  const setMenuIconToken = (newToken: string) => {
    const token = tokenList[newToken as keyof typeof tokenList];
    setMenuIcon(
      <Image src={token.imageSrc} boxSize={"16px"} alt={token.name} />
    );
  };

  return (
    <Stack
      direction="column"
      width={"400px"}
      height={"48px"}
      mt={"10px"}
      borderRadius={"50px"}
    >
      <AutoComplete
        openOnFocus
        defaultIsOpen
        rollNavigation
        listAllValuesOnFocus
        onChange={(value) => {
          setToken(value);
          setInputText(value);
          setMenuIconToken(value);
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="inherit"
            height={"100%"}
            ml={"2px"}
          >
            {menuIcon}
          </InputLeftElement>
          <AutoCompleteInput
            borderRadius={"50px"}
            height={"48px"}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            _focus={{ backgroundColor: "black" }}
            onClick={() => {
              setInputText("");
              setMenuIcon(searchIcon);
            }}
            fontSize={"14px"}
            fontWeight={"500"}
            backgroundColor={"black"}
            _hover={{ backgroundColor: "black" }}
            border={"none"}
            placeholder="Search for token..."
          />
          <InputRightElement
            pointerEvents="none"
            color="inherit"
            height={"100%"}
          >
            <Icon boxSize="10px" viewBox="0 0 10 5" focusable="false">
              <path fill="currentColor" d="M0 0L5 5L10 0H0Z"></path>
            </Icon>
          </InputRightElement>
        </InputGroup>
        <AutoCompleteList padding={"0px"} color={"black"} borderRadius={"14px"}>
          <AutoCompleteGroup
            backgroundColor={"black"}
            padding={"12px"}
            borderRadius={"12px"}
            borderTopRightRadius={"0px"}
          >
            {Object.values(tokenList).map((token: any, oid: number) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={token.symbol}
                label={token.name + " " + token.symbol}
                textTransform="capitalize"
                bg={"gray.800"}
                color={"white"}
                borderRadius={"50px"}
                fontSize={"14px"}
                fontWeight={"500"}
                padding={"8px 16px"}
                _last={{ mb: "0px" }}
                mb={"9px"}
                mx={"0px"}
                _focus={{ bg: "gray.400" }}
                _hover={{ bg: "gray.400" }}
              >
                <Image
                  src={token.imageSrc}
                  alt="Index Coop Logo"
                  height={"20px"}
                  mr={"8px"}
                />
                {token.name} ({token.symbol})
              </AutoCompleteItem>
            ))}
          </AutoCompleteGroup>
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
};

export default TokenDropBox;
