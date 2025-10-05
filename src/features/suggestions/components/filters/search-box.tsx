"use client";

import { CloseButton, Field, GridItem, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { Filters } from "../../types/filters";

interface EmployeeSearchBoxProps {
  filters?: Filters;
  callback: (value: string) => void;
}

export default function EmployeeSearchBox({ filters, callback }: EmployeeSearchBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const endElement = filters?.search ? (
    <CloseButton
      size="xs"
      onClick={() => {
        callback("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Field.Root width={{ base: "full", lg: "initial" }}>
      <Field.Label>Search</Field.Label>
      <InputGroup
        endElement={endElement}
        maxWidth={{ base: "initial", lg: "56" }}
        minWidth={{ base: "initial", lg: "56" }}
      >
        <Input
          size="sm"
          bgColor="white"
          _focusVisible={{ outlineWidth: "0.25px", outlineColor: "blue.400" }}
          type="text"
          ref={inputRef}
          placeholder="Enter employee name or ID"
          value={filters?.search ?? ""}
          onChange={(e) => {
            callback(e.currentTarget.value);
          }}
        />
      </InputGroup>
    </Field.Root>
  );
}
