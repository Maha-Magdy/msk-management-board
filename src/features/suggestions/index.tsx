"use client";

import { VStack, Grid, GridItem } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import dynamic from "next/dynamic";
import useEmployees from "../employees/hooks/useEmployees";
import AddSuggestionForm from "./components/add-suggestion-form";
import SuggestionsFilters from "./components/filters/filters";
import SuggestionDetails from "./components/suggestion-details";
import SuggestionsTable from "./components/table/suggestions-table";
import { useSuggestions } from "./hooks/use-suggestions";
import { Filters } from "./types/filters";
import { Status, Suggestion } from "./types/suggestion";
import BatchStatusDropdown from "./components/batch-status-dropdown";
import { useSuggestionsStore } from "./store/suggestions";

const SuggestionDrawer = dynamic(() => import("./components/suggestion-drawer"));

export default function Suggestions() {
  const [filters, setFilters] = useState<Filters>();
  const [isAddSuggestionDrawerOpen, setIsAddSuggestionDrawerOpen] = useState<boolean>(false);
  const [isOverviewSuggestionDrawerOpen, setIsOverviewSuggestionDrawerOpen] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion>();

  const { getSuggestionsQuery, suggestionStatusMutation } = useSuggestions(filters);
  const { data = [], isLoading } = getSuggestionsQuery;
  const { getEmployeesQuery } = useEmployees();
  const { data: employees = [] } = getEmployeesQuery;

  const selectedSuggestions = useSuggestionsStore((state) => state.selectedSuggestions);


  function handleTableRowClick(suggestion: Suggestion) {
    setSelectedSuggestion(suggestion);
    setIsOverviewSuggestionDrawerOpen(true);
  }

  const handleOnUpdateStatus = useCallback(
    (id: number, status: Status) => suggestionStatusMutation.mutate({ id, status }),
    [suggestionStatusMutation]
  );

  return (
    <>
      <VStack
        width={{
          lg: "full",
        }}
        gap={4}
      >
        <Grid
          templateColumns={{
            base: selectedSuggestions.length > 0 ? "repeat(2, 1fr) auto" : "repeat(2, 1fr)",
            lg: "1fr auto auto auto",
          }}
          templateRows={{ base: "auto", lg: "repeat(2, auto)" }}
          gap="2"
          width="full"
          alignItems="end"
          position="sticky"
          top={0}
          zIndex="docked"
          bg="white"
          boxShadow="sm"
          p={3}
        >
          <SuggestionsFilters filters={filters} onChange={setFilters} />
          <GridItem gridArea={{ base: "2/ 2 /span 1/ span 1", lg: "auto" }}>
            <SuggestionDrawer
              triggerTitle="New Suggestion"
              triggerIcon={<IoMdAdd />}
              drawerTitle="Add New Suggestion"
              isOpen={isAddSuggestionDrawerOpen}
              setIsOpen={setIsAddSuggestionDrawerOpen}
            >
              <AddSuggestionForm employees={employees ?? []} callback={() => setIsAddSuggestionDrawerOpen(false)} />
            </SuggestionDrawer>
          </GridItem>
          {selectedSuggestions.length !== 0 && (
            <GridItem gridArea={{ base: "2/ 3 /span 1/ span 1", lg: "auto" }}>
              <BatchStatusDropdown />
            </GridItem>
          )}
        </Grid>

        <SuggestionsTable
          data={data as Suggestion[]}
          onUpdateStatus={handleOnUpdateStatus}
          callback={handleTableRowClick}
          isLoading={isLoading}
        />
      </VStack>

      {/* The overview suggestion drawer */}
      <SuggestionDrawer
        drawerTitle="Suggestion Overview"
        isOpen={isOverviewSuggestionDrawerOpen}
        setIsOpen={setIsOverviewSuggestionDrawerOpen}
      >
        <SuggestionDetails
          suggestion={selectedSuggestion!}
          onUpdateStatus={(id, status) => {
            setSelectedSuggestion(
              (selectedSuggestion) => selectedSuggestion && { ...selectedSuggestion, status: status }
            );
            suggestionStatusMutation.mutate({ id, status });
          }}
          employee={employees.find((employee) => employee.id === selectedSuggestion?.employee_id)!}
        />
      </SuggestionDrawer>
    </>
  );
}
