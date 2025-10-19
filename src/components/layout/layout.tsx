"use client";

import { useAppStore } from "@/store/app";
import { useBreakpointValue, Flex, VStack, Box } from "@chakra-ui/react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobileView = useBreakpointValue({ base: true, lg: false });
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);

  return (
    <Flex>
      <Sidebar />

      <VStack
        gap={0}
        width="full"
        minH="100vh"
        flexGrow={1}
        paddingLeft={isMobileView ? "unset" : isSidebarOpen ? { lg: "80" } : "20"}
      >
        <Header />
        <Box as="main" bgColor="bg.muted" w={{ base: "100vw", lg: "100%" }} p={4} flexGrow={1}>
          {children}
        </Box>
      </VStack>
    </Flex>
  );
}
