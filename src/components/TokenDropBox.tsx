import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { TokenList, TOKEN_LIQUIDITY_LIST } from "@utils/constants/tokens";
import React, { useEffect, useState } from "react";
import { Icon, createIcon } from "@chakra-ui/react";

type TokenDropBoxProps = {
  setToken: (token: string) => void;
  tokenKey: string;
  tokenList: TokenList
  tokenChosen: boolean,
  setTokenChosen: (tokenChosen: boolean) => void
};
const TokenDropBox = ({ setToken, tokenKey, tokenList, tokenChosen, setTokenChosen }: TokenDropBoxProps): JSX.Element => {
  const TokenIcon = createIcon({
    displayName: "TokenIcon",
    viewBox: "0 0 20 20",
    d: "M12.5 3.33331C8.81671 3.33331 5.83337 6.31665 5.83337 9.99998C5.83337 13.6833 8.81671 16.6666 12.5 16.6666C16.1834 16.6666 19.1667 13.6833 19.1667 9.99998C19.1667 6.31665 16.1834 3.33331 12.5 3.33331ZM12.5 15C9.74171 15 7.50004 12.7583 7.50004 9.99998C7.50004 7.24165 9.74171 4.99998 12.5 4.99998C15.2584 4.99998 17.5 7.24165 17.5 9.99998C17.5 12.7583 15.2584 15 12.5 15ZM2.50004 9.99998C2.50004 8.00831 3.66671 6.28331 5.35837 5.48331C5.64171 5.34998 5.83337 5.09165 5.83337 4.78331V4.62498C5.83337 4.05831 5.24171 3.69998 4.73337 3.94165C2.43337 4.99165 0.833374 7.30831 0.833374 9.99998C0.833374 12.6916 2.43337 15.0083 4.73337 16.0583C5.24171 16.2916 5.83337 15.9416 5.83337 15.375V15.225C5.83337 14.9166 5.64171 14.65 5.35837 14.5166C3.66671 13.7166 2.50004 11.9916 2.50004 9.99998Z",
  });

  const DropDownIcon = createIcon({
    displayName: "DropDownIcon",
    viewBox: "0 0 10 5",
    d: "M0 0L5 5L10 0H0Z",
  });

  const  [menuState, setMenuState] = useState({icon: <TokenIcon boxSize={"20px"} />, token: "Choose A Token"})

  useEffect(() => {
    const token = tokenList[tokenKey as keyof typeof tokenList]
    tokenChosen ? setMenuState({icon: <Image src={token.imageSrc} boxSize={"20px"} alt={token.name} />, token: token.symbol}) : null
  }, [tokenChosen, tokenKey, tokenList])

  return (
    <Menu>
      <MenuButton
        fontSize={"14px"}
        height={"48px"}
        width={"200px"}
        bg={"black"}
        borderRadius={"50px"}
        as={Button}
        rightIcon={<DropDownIcon boxSize={"10px"} mr={"10px"} />}
        leftIcon={menuState.icon}
        _hover={{ bg: "black" }}
        _focus={{ bg: "black" }}
        _active={{ bg: "black" }}
        textAlign={"left"}
      >
       {menuState.token}
      </MenuButton>
      <MenuList
        bg={"black"}
        width={"264px"}
        padding={"12px"}
        borderRadius={"12px"}
        borderColor="black"
        onClick={() => setTokenChosen(true)}
      >
        <MenuGroup title="Choose a Token" mx={"0px"} mb={"9px"} mt={"0px"}>
          {Object.values(tokenList).map((token, index) => {
            return (
              <MenuItem
                bg={"gray.800"}
                color={"white"}
                borderRadius={"50px"}
                fontSize={"14px"}
                fontWeight={"500"}
                key={index}
                padding={"8px 16px"}
                mb={"9px"}
                _last={{ mb: "0px" }}
                onClick={() => setToken(token.symbol)}
                _hover={{ bg: "gray.400" }}
              >
                <Image
                  src={token.imageSrc}
                  alt="Index Coop Logo"
                  height={"20px"}
                  mr={'8px'}
                />
                {token.name}
              </MenuItem>
            );
          })}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default TokenDropBox;
