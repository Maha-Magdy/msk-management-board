import { createListCollection, Listbox, Box } from "@chakra-ui/react";
import { GiTeamIdea } from "react-icons/gi";
import { useAppStore } from "../../app/store/app";
import { HiHome } from "react-icons/hi";

const navigationList = createListCollection({
  items: [
    {
      label: "Home",
      value: "home",
      href: "/",
      icon: <HiHome size={16} />,
    },
    {
      label: "Suggestions",
      value: "suggestions",
      href: "/suggestions",
      icon: <GiTeamIdea size={16} />,
    },
  ],
});

export default function NavigationList() {
  const { isSidebarOpen } = useAppStore();

  return (
    <Listbox.Root collection={navigationList} width="full">
      <Listbox.Content borderRadius={0} border="unset" bgColor="transparent" p={0} gap={0}>
        {navigationList.items.map((navigationItem) => (
          <Listbox.Item
            item={navigationItem}
            key={navigationItem.value}
            px="4"
            py="4"
            borderLeft="5px solid"
            borderColor="blue.400"
            borderRadius="unset"
            bgColor="transparent"
            _hover={{ bgColor: "blue.900" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={isSidebarOpen ? "initial" : "center"}
              pr={isSidebarOpen ? "unset" : "5px"}
              gap="3"
              flex="1"
              color="white"
            >
              <Box flexShrink="0">{navigationItem.icon}</Box>
              {isSidebarOpen && (
                <Listbox.ItemText fontSize="sm" fontWeight="semibold">
                  {navigationItem.label}
                </Listbox.ItemText>
              )}
            </Box>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  );
}
