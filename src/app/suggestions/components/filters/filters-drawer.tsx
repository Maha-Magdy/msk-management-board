import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface FiltersDrawerProps {
  clearFilters: () => void;
  applyFilters: () => void;
  children: ReactNode;
}

export default function FiltersDrawer({ clearFilters, applyFilters, children }: FiltersDrawerProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer.Root placement="bottom" open={open}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          backgroundColor="white"
          width="full"
          px={8}
          borderColor="blue.400"
          onClick={() => setOpen(true)}
        >
          Filters
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title fontWeight="semibold">Filter your results</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.Footer justifyContent="center" p={4}>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
              <Button
                bgColor="blue.400"
                onClick={() => {
                  applyFilters();
                  setOpen(false);
                }}
              >
                Apply filters
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" top={5} insetInlineEnd={4} onClick={() => setOpen(false)} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
