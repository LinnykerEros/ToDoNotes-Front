import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  height?: number;
  icon?: string;
  width?: string;
  onChange?: any;
  ml?: number;
  defaultValue?: string;
}

export function Input({
  name,
  type,
  label,
  height,
  icon,
  ...rest
}: InputProps) {
  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} {...rest}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraInput
          id={name}
          type={type}
          name={name}
          // focusBorderColor="none"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.900",
          }}
          size="lg"
          height={height}
          {...rest}
        />
        {icon ? (
          <InputRightAddon
            height={height}
            //  size="lg"
            bgColor="gray.900"
            border="none"
            cursor="pointer"
            // onClick={() => handleSearch()}
            children={icon}
          />
        ) : (
          ""
        )}
      </InputGroup>
    </FormControl>
  );
}
