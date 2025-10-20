import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Filters } from "../../types/filters";
import { GridItem, useBreakpointValue } from "@chakra-ui/react";
import EmployeeSearchBox from "./search-box";
import DropdownFilters from "./dropdown-filters";
import { useSuggestionsStore } from "../../store/suggestions";
import dynamic from "next/dynamic";

interface SuggestionsFiltersProps {
  filters?: Filters;
  onChange: Dispatch<SetStateAction<Filters | undefined>>;
}

const FiltersDrawer = dynamic(() => import("./filters-drawer"));

export default function SuggestionsFilters({ filters, onChange }: SuggestionsFiltersProps) {
  const [draftFilters, setDraftFilters] = useState<Filters | undefined>(filters);
  const { toggleClearSuggestions, selectedSuggestions } = useSuggestionsStore();
  const isMobileView = useBreakpointValue({ base: true, xl: false });

  const handleClearFilters = useCallback(() => {
    setDraftFilters(undefined);
    onChange(undefined);
    toggleClearSuggestions();
  }, [onChange, toggleClearSuggestions]);

  const handleApplyFilters = useCallback(() => {
    onChange(draftFilters);
    toggleClearSuggestions();
  }, [draftFilters, onChange, toggleClearSuggestions]);

  const handleOnSearchValueChange = useCallback((value: string) => {
    onChange((filters) => ({ ...filters, search: value }));
    toggleClearSuggestions();
  }, [onChange, toggleClearSuggestions]);

  useEffect(() => setDraftFilters(filters), [filters]);

  return (
    <>
      <GridItem gridArea={{ base: "2/ 1 /span 1/ span 1", lg: "auto" }}>
        {!isMobileView && <DropdownFilters filters={filters} onChange={onChange} />}

        {isMobileView && (
          <FiltersDrawer clearFilters={handleClearFilters} applyFilters={handleApplyFilters}>
            <DropdownFilters filters={draftFilters} onChange={setDraftFilters} />
          </FiltersDrawer>
        )}
      </GridItem>

      <GridItem
        gridArea={{
          base: selectedSuggestions.length > 0 ? "1/ 1 /span 1/ span 3" : "1/ 1 /span 1/ span 2",
          lg: "auto",
        }}
      >
        <EmployeeSearchBox filters={filters} callback={handleOnSearchValueChange} />
      </GridItem>
    </>
  );
}
