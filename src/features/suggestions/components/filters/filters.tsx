import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filters } from "../../types/filters";
import { GridItem, useBreakpointValue } from "@chakra-ui/react";
import EmployeeSearchBox from "./search-box";
import DropdownFilters from "./dropdown-filters";
import FiltersDrawer from "./filters-drawer";

interface SuggestionsFiltersProps {
  filters?: Filters;
  onChange: Dispatch<SetStateAction<Filters | undefined>>;
}

export default function SuggestionsFilters({ filters, onChange }: SuggestionsFiltersProps) {
  const [draftFilters, setDraftFilters] = useState<Filters | undefined>(filters);
  const isMobileView = useBreakpointValue({ base: true, lg: false });

  function handleClearFilters() {
    setDraftFilters(undefined);
    onChange(undefined);
  }

  function handleApplyFilters() {
    onChange(draftFilters);
  }

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

      <GridItem gridArea={{ base: "1/ 1 /span 1/ span 2", lg: "auto" }}>
        <EmployeeSearchBox
          filters={filters}
          callback={(value: string) => onChange((filters) => ({ ...filters, search: value }))}
        />
      </GridItem>
    </>
  );
}
