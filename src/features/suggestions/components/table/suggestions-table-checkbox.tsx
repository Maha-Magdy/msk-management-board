import { Checkbox } from "@chakra-ui/react";
import type { ReactNode, Ref } from "react";

interface TableCheckboxProps {
  ref: Ref<HTMLInputElement>;
  checked: boolean;
  onChange: () => void;
  onClick: () => void;
}

const SuggestionsTableCheckbox = ({ ref, checked, onChange, onClick, ...rest }: TableCheckboxProps): ReactNode => {
  return (
    <Checkbox.Root variant="solid" onCheckedChange={onChange} checked={checked} {...rest}>
      <Checkbox.HiddenInput />
      <Checkbox.Control
        ref={ref}
        onClick={onClick}
        cursor="pointer"
        bgColor={checked ? "blue.400" : "white"}
        borderColor={checked ? "blue.400" : "gray.200"}
      />
    </Checkbox.Root>
  );
};

export default SuggestionsTableCheckbox;
