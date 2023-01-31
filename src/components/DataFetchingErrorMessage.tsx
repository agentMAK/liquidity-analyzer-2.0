import { WarningIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Link,
  Button,
  IconButton,
  Text,
  Portal,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
} from "@chakra-ui/react";

const DataFetchingErrorMessage = (props: any): JSX.Element => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          width={"16px"}
          height={"16px"}
          minWidth={"0"}
          borderRadius={"16px"}
          _hover={{ bg: "none" }}
          aria-label="Error"
          icon={<WarningIcon color="red.500" />}
        ></IconButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          bgColor={"red.100"}
          borderColor={"red.100"}
          width={"400px"}
        >
          <PopoverArrow bgColor={"red.100"} />
          <PopoverBody>
            <Alert status="error" padding={"0"}>
              <AlertIcon />
              <AlertTitle>Unable to fetch data</AlertTitle>
              <AlertDescription>
                - &nbsp;Please try again later
              </AlertDescription>
            </Alert>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DataFetchingErrorMessage;
