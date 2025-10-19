"use client";

import { Avatar, Flex, IconButton, Menu, Portal, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { useAppStore } from "../../store/app";

export default function Header() {
  const openSidebar = useAppStore((state) => state.openSidebar);
  const showElement = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      as="header"
      w="full"
      h={14}
      px="4"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      alignItems="center"
    >
      {showElement && (
        <>
          <IconButton aria-label="Open the sidebar navigation" bgColor="blue.400" onClick={openSidebar}>
            <CiMenuBurger />
          </IconButton>

          <Link href="/" aria-label="Msk Management Board, Back to homepage">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 600 200" width="150" height="50">
              <style>
                {`tspan { white-space:pre } 
		.t0 { font-size: 100px;fill: #60a5fa;font-weight: 400;font-family: "AbrilFatface-Regular", "Abril Fatface" } `}
              </style>
              <text
                id="MSK Board"
                style={{
                  transform: "matrix(1.087,0,0,1.087,17.827,140.506)",
                }}
              >
                <tspan x="0" y="0" className="t0">
                  M
                </tspan>
                <tspan y="0" className="t0">
                  S
                </tspan>
                <tspan y="0" className="t0">
                  K
                </tspan>
                <tspan y="0" className="t0">
                  {" "}
                </tspan>
                <tspan y="0" className="t0">
                  B
                </tspan>
                <tspan y="0" className="t0">
                  o
                </tspan>
                <tspan y="0" className="t0">
                  a
                </tspan>
                <tspan y="0" className="t0">
                  r
                </tspan>
                <tspan y="0" className="t0">
                  d
                </tspan>
                <tspan y="0" className="t0"></tspan>
              </text>
            </svg>
          </Link>
        </>
      )}

      <Menu.Root>
        <Menu.Trigger rounded="full" focusRing="outside" cursor="pointer">
          <Avatar.Root size="sm" bgColor="blue.400" color="white">
            <Avatar.Fallback name="Maha" />
            {/* <Avatar.Image src="" /> */}
          </Avatar.Root>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content p="2">
              <Menu.Item value="maha magdy" px="2" py="1" fontWeight="bold" _hover={{ backgroundColor: "unset" }}>
                Maha Magdy
              </Menu.Item>
              <Menu.Separator my="2" />
              <Menu.Item value="logout" px="2" py="1" cursor="pointer">
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}
