"use client"

import { useAppStore } from "@/store/app";
import { VStack, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import useEmployees from "../employees/hooks/useEmployees";
import AddSuggestionForm from "./components/add-suggestion-form";
import SuggestionsFilters from "./components/filters/filters";
import SuggestionDetails from "./components/suggestion-details";
import SuggestionDrawer from "./components/suggestion-drawer";
import SuggestionsTable from "./components/suggestions-table";
import { useSuggestions } from "./hooks/use-suggestions";
import { Filters } from "./types/filters";
import { Suggestion } from "./types/suggestion";

export default function Suggestions() {
  const { isSidebarOpen } = useAppStore();
  
  const [filters, setFilters] = useState<Filters>();
  const [isAddSuggestionDrawerOpen, setIsAddSuggestionDrawerOpen] = useState<boolean>(false);
  const [isOverviewSuggestionDrawerOpen, setIsOverviewSuggestionDrawerOpen] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion>();

  const { getSuggestionsQuery, suggestionStatusMutation } = useSuggestions(filters);
  const { data = [], isLoading } = getSuggestionsQuery;
  const { getEmployeesQuery } = useEmployees();
  const { data: employees = [] } = getEmployeesQuery;

  function handleTableRowClick(suggestion: Suggestion) {
    setSelectedSuggestion(suggestion);
    setIsOverviewSuggestionDrawerOpen(true);
  }

  if (isLoading) {
    return <p>Fetching...</p>;
  }

  return (
    <>
      <VStack
        width={{
          lg: isSidebarOpen ? "calc(100vw - 20rem)" : "calc(100vw - 130px)",
        }}
      >
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "1fr auto auto" }}
          templateRows={{ base: "auto", lg: "repeat(2, auto)" }}
          gap="2"
          width="full"
          alignItems="end"
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
        </Grid>

        <SuggestionsTable
          data={data as Suggestion[]}
          onUpdateStatus={(id, status) => suggestionStatusMutation.mutate({ id, status })}
          callback={handleTableRowClick}
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
