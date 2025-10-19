"use client";

import { CloseButton, Field, Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { Filters } from "../../types/filters";

interface EmployeeSearchBoxProps {
  filters?: Filters;
  callback: (value: string) => void;
}

export default function EmployeeSearchBox({ filters, callback }: EmployeeSearchBoxProps) {
  const [value, setValue] = useState(filters?.search ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedCallback = useMemo(
    () =>
      debounce((value: string) => {
        callback(value);
      }, 200),
    [callback]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  const endElement = filters?.search ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
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
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            debouncedCallback(e.currentTarget.value);
          }}
        />
      </InputGroup>
    </Field.Root>
  );
}
