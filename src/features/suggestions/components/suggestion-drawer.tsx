import { Button, Portal, CloseButton, Drawer } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface SuggestionDrawer {
  triggerTitle?: string;
  triggerIcon?: ReactNode;
  drawerTitle: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function SuggestionDrawer({
  triggerTitle,
  triggerIcon,
  drawerTitle,
  children,
  isOpen,
  setIsOpen,
}: SuggestionDrawer) {
  return (
    <Drawer.Root preventScroll={true} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size="sm">
      {triggerTitle && (
        <Drawer.Trigger asChild>
          <Button size="sm" width="full" variant="solid" backgroundColor="blue.400" _hover={{ backgroundColor: "blue.500" }}>
            {triggerIcon && triggerIcon}
            {triggerTitle}
          </Button>
        </Drawer.Trigger>
      )}

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{drawerTitle}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" top="5" insetInlineEnd="5" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
