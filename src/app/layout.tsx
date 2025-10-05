import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header";
import { Box, Flex, VStack } from "@chakra-ui/react";
import Sidebar from "../components/layout/sidebar";
import Providers from "../providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSK Management Board",
  description: "The MSK Management Board is a dashboard that allows admins to monitor MSK suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Flex>
            <Sidebar />

            <VStack gap={0} minH="vh" flexGrow={1}>
              <Header />
              <Box as="main" bgColor="bg.muted" w={{ base: "vw", lg: "full" }} p={4} flexGrow={1}>
                {children}
              </Box>
            </VStack>
          </Flex>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
