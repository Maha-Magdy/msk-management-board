import { Button, Menu, Portal } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Status } from "../types/suggestion";
import { useSuggestionsStore } from "../store/suggestions";
import { useSuggestions } from "../hooks/use-suggestions";

export default function BatchStatusDropdown() {
  const selectedSuggestions = useSuggestionsStore((state) => state.selectedSuggestions);
  const { suggestionsStatusMutation } = useSuggestions();

  function handleAction(status: Status) {
    const ids = selectedSuggestions.map((suggestion) => suggestion.id);
    suggestionsStatusMutation.mutate({ ids, status });
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        as={Button}
        focusRing="outside"
        cursor="pointer"
        width="full"
        minWidth={9}
        height={9}
        rounded="full"
        padding="unset"
        backgroundColor="blue.400"
        _hover={{ backgroundColor: "blue.500" }}
      >
        <HiOutlineDotsVertical />
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content p="2">
            <Menu.Item value="pending" p="2" cursor="pointer" onClick={() => handleAction("pending")}>
              Mark as pending
            </Menu.Item>
            <Menu.Item value="in_progress" p="2" cursor="pointer" onClick={() => handleAction("in_progress")}>
              Mark as in progress
            </Menu.Item>
            <Menu.Item value="completed" p="2" cursor="pointer" onClick={() => handleAction("completed")}>
              Mark as completed
            </Menu.Item>
            <Menu.Item value="overdue" p="2" cursor="pointer" onClick={() => handleAction("overdue")}>
              Mark as in overdue
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
