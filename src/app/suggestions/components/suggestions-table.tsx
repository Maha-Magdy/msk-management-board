import DataTable from "react-data-table-component";
import { Button, Flex, Menu, Portal, Text } from "@chakra-ui/react";
import { Priority, Status, Suggestion } from "../types/suggestion";
import moment from "moment";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";

interface SuggestionsTableProps {
  data: Suggestion[];
  onUpdateStatus: (id: number, status: Status) => void;
  callback: (row: Suggestion) => void;
}

const customStyles = {
  tableWrapper: {
    style: {
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
  },
  head: {
    style: {
      fontWeight: "600",
      color: "gray",
    },
  },
  rows: {
    style: {
      cursor: "pointer",
      "&:not(:last-of-type)": {
        borderBottom: "unset",
      },
    },
  },
};

const priorityOrder: Record<Priority, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

export default function SuggestionsTable({ data, onUpdateStatus, callback }: SuggestionsTableProps) {
  const columns = [
    {
      name: "Employee",
      selector: (row: Suggestion) => row["employee_name"],
      cell: (row: Suggestion) => (
        <Text fontWeight="semibold" textWrap="nowrap" data-tag="allowRowEvents">
          {row["employee_name"]}
        </Text>
      ),
    },
    {
      name: "Type",
      selector: (row: Suggestion) => row.type,
      cell: (row: Suggestion) => <Text data-tag="allowRowEvents" textTransform="capitalize">{row.type}</Text>,
    },
    {
      name: "Description",
      selector: (row: Suggestion) => row.description,
      grow: 3,
    },
    {
      name: "Created",
      selector: (row: Suggestion) => row.created_at,
      cell: (row: Suggestion) => <Text data-tag="allowRowEvents" textTransform="capitalize">{moment(row.created_at).format("DD MMM YYYY")}</Text>,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row: Suggestion) => row.priority,
      cell: (row: Suggestion) => (
        <Flex data-tag="allowRowEvents" gap={2} alignItems="center">
          {row.priority === "high" && <FcHighPriority />}
          {row.priority === "medium" && <FcMediumPriority />}
          {row.priority === "low" && <FcLowPriority />}
          <Text textTransform="capitalize">{row.priority}</Text>
        </Flex>
      ),
      sortable: true,
      sortFunction: (a: Suggestion, b: Suggestion) => priorityOrder[a.priority] - priorityOrder[b.priority],
    },
    {
      name: "Source",
      selector: (row: Suggestion) => row.source,
      cell: (row: Suggestion) => <Text data-tag="allowRowEvents" textTransform="capitalize">{row.source === "vida" ? "VIDA" : "Admin"}</Text>,
    },
    {
      name: "Status",
      selector: (row: Suggestion) => row.status,
      cell: (row: Suggestion) => (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant="subtle"
              size="xs"
              px={4}
              minW={28}
              colorPalette={
                row.status === "pending"
                  ? "yellow"
                  : row.status === "in_progress"
                  ? "blue"
                  : row.status === "completed"
                  ? "green"
                  : "red"
              }
            >
              <Text textTransform="capitalize">{row.status === "in_progress" ? "In Progress" : row.status}</Text>
            </Button>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content p={2}>
                <Menu.Item as="button" value="pending" px={2} py={1} onClick={() => onUpdateStatus(row.id, "pending")}>
                  Pending
                </Menu.Item>
                <Menu.Item
                  as="button"
                  value="in_progress"
                  px={2}
                  py={1}
                  onClick={() => onUpdateStatus(row.id, "in_progress")}
                >
                  In Progress
                </Menu.Item>
                <Menu.Item
                  as="button"
                  value="Completed"
                  px={2}
                  py={1}
                  onClick={() => onUpdateStatus(row.id, "completed")}
                >
                  Completed
                </Menu.Item>
                <Menu.Item as="button" value="Overdue" px={2} py={1} onClick={() => onUpdateStatus(row.id, "overdue")}>
                  Overdue
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ),
      center: true,
    },
  ];

  return <DataTable data={data} columns={columns} customStyles={customStyles} onRowClicked={(row: Suggestion) => callback(row)} striped />;
}
