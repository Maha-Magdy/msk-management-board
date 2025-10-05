import { VStack, Text, Menu, Button, Flex } from "@chakra-ui/react";
import { Status, Suggestion } from "../types/suggestion";
import { Employee } from "@/features/employees/types/employee";
import { FcHighPriority, FcMediumPriority, FcLowPriority } from "react-icons/fc";
import moment from "moment";

interface SuggestionDetailsProps {
  suggestion: Suggestion;
  onUpdateStatus: (id: number, status: Status) => void;
  employee: Employee;
}

export default function SuggestionDetails({ suggestion, onUpdateStatus, employee }: SuggestionDetailsProps) {
  return (
    <VStack alignItems="flex-start" gap={6}>
      <Text color="fg.muted" fontSize="sm">
        A detailed view of the selected suggestion.
      </Text>

      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            variant="subtle"
            size="xs"
            px={4}
            minW={28}
            colorPalette={
              suggestion.status === "pending"
                ? "yellow"
                : suggestion.status === "in_progress"
                ? "blue"
                : suggestion.status === "completed"
                ? "green"
                : "red"
            }
          >
            <Text textTransform="capitalize">
              {suggestion.status === "in_progress" ? "In Progress" : suggestion.status}
            </Text>
          </Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content p={2}>
            <Menu.Item
              as="button"
              value="pending"
              px={2}
              py={1}
              onClick={() => onUpdateStatus(suggestion.id, "pending")}
            >
              Pending
            </Menu.Item>
            <Menu.Item
              as="button"
              value="in_progress"
              px={2}
              py={1}
              onClick={() => onUpdateStatus(suggestion.id, "in_progress")}
            >
              In Progress
            </Menu.Item>
            <Menu.Item
              as="button"
              value="Completed"
              px={2}
              py={1}
              onClick={() => onUpdateStatus(suggestion.id, "completed")}
            >
              Completed
            </Menu.Item>
            <Menu.Item
              as="button"
              value="Overdue"
              px={2}
              py={1}
              onClick={() => onUpdateStatus(suggestion.id, "overdue")}
            >
              Overdue
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Employee Name
        </Text>
        <Text fontWeight="semibold">{employee.name}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Employee Department
        </Text>
        <Text fontWeight="semibold">{employee.department}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Type
        </Text>
        <Text fontWeight="semibold" textTransform="capitalize">{suggestion.type}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Priority
        </Text>
        <Flex data-tag="allowRowEvents" gap={2} alignItems="center">
          {suggestion.priority === "high" && <FcHighPriority />}
          {suggestion.priority === "medium" && <FcMediumPriority />}
          {suggestion.priority === "low" && <FcLowPriority />}
          <Text textTransform="capitalize">{suggestion.priority}</Text>
        </Flex>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Description
        </Text>
        <Text fontWeight="semibold">{suggestion.description}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Source
        </Text>
        <Text fontWeight="semibold" textTransform="capitalize">{suggestion.source}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Creation Date
        </Text>
        <Text fontWeight="semibold">{moment(suggestion.created_at).format("DD MMM YYYY, hh:MM a")}</Text>
      </VStack>

      <VStack alignItems="flex-start" gap={1}>
        <Text color="fg.muted" fontSize="sm">
          Notes
        </Text>
        <Text fontWeight="semibold">{suggestion.notes}</Text>
      </VStack>
    </VStack>
  );
}
