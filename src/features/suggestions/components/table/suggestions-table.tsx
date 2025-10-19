import DataTable from "react-data-table-component";
import { Button, Flex, Menu, Portal, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Priority, Status, Suggestion } from "../../types/suggestion";
import moment from "moment";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useSuggestionsStore } from "../../store/suggestions";
import { ReactNode, useMemo } from "react";
import SuggestionsTableCheckbox from "./suggestions-table-checkbox";
import { FaArrowDownWideShort } from "react-icons/fa6";

interface SuggestionsTableProps {
  data: Suggestion[];
  onUpdateStatus: (id: number, status: Status) => void;
  callback: (row: Suggestion) => void;
  isLoading: boolean;
}

interface StatusMenuProps {
  status: Status;
  id: number;
  onUpdateStatus: (id: number, status: Status) => void;
}

const customStyles = {
  tableWrapper: {
    style: {
      border: "1px solid rgba(0, 0, 0, 0.05)",
      display: "table",
      "@media screen and (min-width: 1536px)": {
        display: "block",
      },
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
        // borderBottom: "unset",
      },
    },
    selectedHighlightStyle: {
      "&:nth-of-type(n)": {
        backgroundColor: "#eff6ff",
      },
    },
  },
};

const priorityOrder: Record<Priority, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

function PriorityBadge({ priority, ...props }: { priority: Priority }) {
  return (
    <Flex data-tag="allowRowEvents" gap={2} alignItems="center" {...props}>
      {priority === "high" && <FcHighPriority />}
      {priority === "medium" && <FcMediumPriority />}
      {priority === "low" && <FcLowPriority />}
      <Text textTransform="capitalize">{priority}</Text>
    </Flex>
  );
}

function StatusMenu({ status, id, onUpdateStatus }: StatusMenuProps) {
  const isMobileView = useBreakpointValue({ base: true, lg: false });

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="subtle"
          size="xs"
          px={4}
          minW={28}
          width={isMobileView ? "full" : "auto"}
          colorPalette={
            status === "pending"
              ? "yellow"
              : status === "in_progress"
              ? "blue"
              : status === "completed"
              ? "green"
              : "red"
          }
        >
          <Text textTransform="capitalize">{status === "in_progress" ? "In Progress" : status}</Text>
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner
          width={isMobileView ? "calc(100% - 32px)" : "auto"}
          transform={isMobileView ? "translate3d(16px, var(--y), 0) !important" : "translate3d(var(--x), var(--y), 0)"}
        >
          <Menu.Content p={2}>
            <Menu.Item
              as="button"
              value="pending"
              px={2}
              py={isMobileView ? 2 : 1}
              onClick={() => onUpdateStatus(id, "pending")}
            >
              Pending
            </Menu.Item>
            <Menu.Item
              as="button"
              value="in_progress"
              px={2}
              py={isMobileView ? 2 : 1}
              onClick={() => onUpdateStatus(id, "in_progress")}
            >
              In Progress
            </Menu.Item>
            <Menu.Item
              as="button"
              value="Completed"
              px={2}
              py={isMobileView ? 2 : 1}
              onClick={() => onUpdateStatus(id, "completed")}
            >
              Completed
            </Menu.Item>
            <Menu.Item
              as="button"
              value="Overdue"
              px={2}
              py={isMobileView ? 2 : 1}
              onClick={() => onUpdateStatus(id, "overdue")}
            >
              Overdue
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default function SuggestionsTable({ data, onUpdateStatus, callback, isLoading }: SuggestionsTableProps) {
  const { toggledClearSuggestions, setSelectedSuggestions } = useSuggestionsStore();
  const isMobileView = useBreakpointValue({ base: true, lg: false });

  const columns = useMemo(
    () =>
      isMobileView
        ? [
            {
              name: "Suggestions",
              selector: (row: Suggestion) => row["employee_name"],
              cell: (row: Suggestion) => (
                <VStack data-tag="allowRowEvents" width="full" alignItems="start" py={4}>
                  <Flex justifyContent="space-between" width="full">
                    <Text fontWeight="semibold" textWrap="nowrap">
                      {row.employee_name}
                    </Text>
                    <PriorityBadge priority={row.priority} />
                  </Flex>
                  <Text fontWeight="semibold" textWrap="nowrap" textTransform="capitalize">
                    {row.type}
                  </Text>
                  <Text textWrap="wrap">{row.description}</Text>
                  <StatusMenu status={row.status} id={row.id} onUpdateStatus={onUpdateStatus} />
                </VStack>
              ),
              grow: 1,
              sortable: true,
              conditionalCellStyles: [
                {
                  when: () => isMobileView,
                  style: {
                    paddingLeft: 0,
                  },
                },
              ],
            },
          ]
        : [
            {
              name: "Employee",
              selector: (row: Suggestion) => row["employee_name"],
              cell: (row: Suggestion) => (
                <Text fontWeight="semibold" textWrap="nowrap" data-tag="allowRowEvents">
                  {row["employee_name"]}
                </Text>
              ),
              sortable: true,
            },
            {
              name: "Type",
              selector: (row: Suggestion) => row.type,
              cell: (row: Suggestion) => (
                <Text data-tag="allowRowEvents" textTransform="capitalize">
                  {row.type}
                </Text>
              ),
            },
            {
              name: "Description",
              selector: (row: Suggestion) => row.description,
              grow: 3,
            },
            {
              name: "Created",
              selector: (row: Suggestion) => row.created_at,
              cell: (row: Suggestion) => (
                <Text data-tag="allowRowEvents" textTransform="capitalize">
                  {moment(row.created_at).format("DD MMM YYYY")}
                </Text>
              ),
              sortable: true,
            },
            {
              name: "Priority",
              selector: (row: Suggestion) => row.priority,
              cell: (row: Suggestion) => <PriorityBadge priority={row.priority} data-tag="allowRowEvents" />,
              sortable: true,
              sortFunction: (a: Suggestion, b: Suggestion) => priorityOrder[a.priority] - priorityOrder[b.priority],
            },
            {
              name: "Source",
              selector: (row: Suggestion) => row.source,
              cell: (row: Suggestion) => (
                <Text data-tag="allowRowEvents" textTransform="capitalize">
                  {row.source === "vida" ? "VIDA" : "Admin"}
                </Text>
              ),
            },
            {
              name: "Status",
              selector: (row: Suggestion) => row.status,
              cell: (row: Suggestion) => <StatusMenu status={row.status} id={row.id} onUpdateStatus={onUpdateStatus} />,
              center: true,
            },
          ],
    [isMobileView, onUpdateStatus]
  );

  function handleOnSelectedRowsChange({
    selectedRows,
  }: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Suggestion[];
  }) {
    setSelectedSuggestions(selectedRows);
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      highlightOnHover
      pointerOnHover
      sortIcon={<FaArrowDownWideShort style={{ margin: "0 5px", width: "12px", height: "12px" }} />}
      customStyles={customStyles}
      onRowClicked={(row: Suggestion) => callback(row)}
      progressPending={isLoading}
      progressComponent={<div className="loader"></div>}
      selectableRows
      selectableRowsHighlight
      clearSelectedRows={toggledClearSuggestions}
      selectableRowsComponent={SuggestionsTableCheckbox as unknown as ReactNode}
      onSelectedRowsChange={handleOnSelectedRowsChange}
      striped
      ariaLabel="Suggestion table"
    />
  );
}
