import { Dispatch, SetStateAction } from "react";
import { Filters } from "../../types/filters";
import { SelectBox } from "@/components/ui/select-box";
import { Flex } from "@chakra-ui/react";
import { priorities, sources, types, status } from "../../constants/suggestion-options";
import { useSuggestionsStore } from "../../store/suggestions";

interface DropdownFiltersProps {
  filters?: Filters;
  onChange: Dispatch<SetStateAction<Filters | undefined>>;
}

export default function DropdownFilters({ filters, onChange }: DropdownFiltersProps) {
  const toggleClearSuggestions = useSuggestionsStore((state) => state.toggleClearSuggestions);

  function handleOnChange(value: string, type: string) {
    onChange((f) => ({ ...f, [type]: value }));
    toggleClearSuggestions();
  }

  return (
    <Flex gap={{ base: "4", lg: "2" }} direction={{ base: "column", lg: "row" }}>
      <SelectBox
        label="Type"
        placeholder="Any type"
        items={types}
        value={filters?.type}
        onChange={(value) => handleOnChange(value, "type")}
        minWidth={{ base: "180px", md: "unset" }}
      />

      <SelectBox
        label="Priority"
        placeholder="Any priority"
        items={priorities}
        value={filters?.priority}
        onChange={(value) => handleOnChange(value, "priority")}
        minWidth={{ base: "180px", md: "unset" }}
      />

      <SelectBox
        label="Sources"
        placeholder="Any source"
        items={sources}
        value={filters?.source}
        onChange={(value) => handleOnChange(value, "source")}
        minWidth={{ base: "180px", md: "unset" }}
      />

      <SelectBox
        label="Status"
        placeholder="Any status"
        items={status}
        value={filters?.status}
        onChange={(value) => handleOnChange(value, "status")}
        minWidth={{ base: "180px", md: "unset" }}
      />
    </Flex>
  );
}
