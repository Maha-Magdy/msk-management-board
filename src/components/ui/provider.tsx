"use client"

import { ChakraProvider as ChakraBaseProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraBaseProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraBaseProvider>
  )
}
