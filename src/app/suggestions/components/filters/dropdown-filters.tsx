import { Dispatch, SetStateAction } from "react";
import { Filters } from "../../types/filters";
import { SelectBox } from "@/components/ui/select-box";
import { Flex } from "@chakra-ui/react";
import { priorities, sources, types, status } from "../../constants/suggestion-options";

interface DropdownFiltersProps {
  filters?: Filters;
  onChange: Dispatch<SetStateAction<Filters | undefined>>;
}

export default function DropdownFilters({
  filters,
  onChange,
}: DropdownFiltersProps) {
  function handleOnChange(value: string, type: string) {
    onChange((f) => ({ ...f, [type]: value }));
  }

  return (
    <Flex
      gap={{ base: "4", lg: "2" }}
      direction={{ base: "column", lg: "row" }}
    >
      <SelectBox
        label="Type"
        placeholder="Any types"
        items={types}
        value={filters?.type}
        onChange={(value) => handleOnChange(value, "type")}
      />

      <SelectBox
        label="Priority"
        placeholder="Any priority"
        items={priorities}
        value={filters?.priority}
        onChange={(value) => handleOnChange(value, "priority")}
      />

      <SelectBox
        label="Sources"
        placeholder="Any source"
        items={sources}
        value={filters?.source}
        onChange={(value) => handleOnChange(value, "source")}
      />

      <SelectBox
        label="Status"
        placeholder="Any status"
        items={status}
        value={filters?.status}
        onChange={(value) => handleOnChange(value, "status")}
      />
    </Flex>
  );
}
