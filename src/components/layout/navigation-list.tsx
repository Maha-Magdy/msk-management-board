import { createListCollection, Listbox, Box } from "@chakra-ui/react";
import { GiTeamIdea } from "react-icons/gi";
import { useAppStore } from "../../store/app";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationList = createListCollection({
  items: [
    {
      label: "Dashboard",
      value: "dashboard",
      href: "/",
      icon: <RiDashboardHorizontalFill size={16} />,
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
  const pathname = usePathname();

  return (
    <Listbox.Root collection={navigationList} width="full">
      <Listbox.Content borderRadius={0} border="unset" bgColor="transparent" p={0} gap={0}>
        {navigationList.items.map((navigationItem) => {
          const isActive = pathname === navigationItem.href;

          return (
            <Link href={navigationItem.href} key={navigationItem.value}>
              <Listbox.Item
                item={{ ...navigationItem, href: navigationItem.href }}
                px="4"
                py="4"
                borderLeft="5px solid"
                borderColor={isActive ? "blue.400" : "transparent"}
                borderRadius="unset"
                bgColor={isActive ? "blue.900" : "transparent"}
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
            </Link>
          );
        })}
      </Listbox.Content>
    </Listbox.Root>
  );
}
