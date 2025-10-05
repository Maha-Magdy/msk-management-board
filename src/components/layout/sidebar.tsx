"use client";

import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import NavigationList from "./navigation-list";
import { IoCloseOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { useAppStore } from "../../store/app";
import { useState } from "react";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, openSidebar } = useAppStore();
  const isMobileView = useBreakpointValue({ base: true, lg: false });
  const [isLogoOnHover, setIsLogoOnHover] = useState<boolean>(false);

  return (
    <>
      {isSidebarOpen && isMobileView && (
        <Box
          w="vw"
          h="vh"
          bgColor="blackAlpha.500"
          position="absolute"
          zIndex="overlay"
        />
      )}

      <VStack
        as="aside"
        gap={0}
        minH="vh"
        bgColor="blue.800"
        position={{ base: "absolute", lg: "initial" }}
        zIndex={{ base: "skipNav", lg: "base" }}
        display={!isSidebarOpen && isMobileView ? "none" : "flex"}
        width={isSidebarOpen ? { base: "2/3", lg: "80" } : "20"}
      >
        <Flex
          px={4}
          justifyContent={isSidebarOpen ? "space-between" : "center"}
          alignItems="center"
          h={14}
          w="full"
          bgColor="blue.900"
          borderBottom="2px solid white"
        >
          <Link href="/" aria-label="Msk Management Board, Back to homepage">
            {isSidebarOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.2"
                viewBox="0 0 600 200"
                width="150"
                height="50"
              >
                <style>
                  {`tspan { white-space:pre } 
		.t1 { font-size: 100px;fill: #ffffff;font-weight: 400;font-family: "AbrilFatface-Regular", "Abril Fatface" } `}
                </style>
                <text
                  id="MSK Board"
                  style={{
                    transform: "matrix(1.087,0,0,1.087,17.827,140.506)",
                  }}
                >
                  <tspan x="0" y="0" className="t1">
                    M
                  </tspan>
                  <tspan y="0" className="t1">
                    S
                  </tspan>
                  <tspan y="0" className="t1">
                    K
                  </tspan>
                  <tspan y="0" className="t1">
                    {" "}
                  </tspan>
                  <tspan y="0" className="t1">
                    B
                  </tspan>
                  <tspan y="0" className="t1">
                    o
                  </tspan>
                  <tspan y="0" className="t1">
                    a
                  </tspan>
                  <tspan y="0" className="t1">
                    r
                  </tspan>
                  <tspan y="0" className="t1">
                    d
                  </tspan>
                  <tspan y="0" className="t1"></tspan>
                </text>
              </svg>
            )}
          </Link>

          {!isSidebarOpen && (
            <Flex
              as="button"
              aria-label="Open the sidebar menu"
              justifyContent="center"
              w="50px"
              cursor="pointer"
              onClick={openSidebar}
              onMouseEnter={() => setIsLogoOnHover(true)}
              onMouseLeave={() => setIsLogoOnHover(false)}
            >
              {!isLogoOnHover && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.2"
                  viewBox="0 0 200 100"
                  width="50"
                  height="50"
                >
                  <style>
                    {`tspan { white-space:pre } 
                .t2 { font-size: 68px;fill: white;font-weight: 400;font-family: "AbrilFatface-Regular", "Abril Fatface" }`}
                  </style>
                  <text
                    id="MSK"
                    style={{
                      transform: "matrix(1.087,0,0,1.087,19.827,83.506)",
                    }}
                  >
                    <tspan x="0" y="0" className="t2">
                      M
                    </tspan>
                    <tspan y="0" className="t2">
                      S
                    </tspan>
                    <tspan y="0" className="t2">
                      K
                    </tspan>
                    <tspan y="0" className="t2"></tspan>
                  </text>
                </svg>
              )}

              {isLogoOnHover && <CiMenuBurger color="white" size={24} />}
            </Flex>
          )}

          {isSidebarOpen && !isMobileView && (
            <IconButton
              aria-label="Toggle the sidebar navigation"
              bgColor="transparent"
              onClick={closeSidebar}
            >
              <CiMenuBurger />
            </IconButton>
          )}

          {isMobileView && (
            <CloseButton
              variant="ghost"
              aria-label="Close"
              color="white"
              size="2xl"
              justifyContent="flex-end"
              onClick={closeSidebar}
            >
              <IoCloseOutline />
            </CloseButton>
          )}
        </Flex>

        <NavigationList />
      </VStack>
    </>
  );
}
