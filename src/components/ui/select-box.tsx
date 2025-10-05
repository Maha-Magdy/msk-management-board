"use client";

import { Field, Portal, Select, createListCollection } from "@chakra-ui/react";

export type Option = { label: string; value: string };

interface SelectBoxProps {
  label?: string;
  placeholder?: string;
  items: Option[];
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
  minWidth?: string;
  maxWidth?: string | Record<string, string>;
  size?: "sm" | "md" | "lg";
  required?: boolean;
}

export function SelectBox({
  label,
  placeholder = "Select option",
  items,
  value,
  onChange,
  width,
  minWidth = "180px",
  maxWidth = { base: "full", lg: "180px" },
  size = "sm",
  required,
}: SelectBoxProps) {
  const collection = createListCollection({ items });

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={(details) => onChange?.(details.value[0])}
      size={size}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <Select.HiddenSelect />
      {label && (
        <Select.Label fontWeight={{ base: "semibold", lg: "normal" }}>
          {label} {required && <Field.RequiredIndicator />}
        </Select.Label>
      )}
      <Select.Control>
        <Select.Trigger bgColor="white">
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner zIndex={{ base: "popover !important", lg: "dropdown" }}>
          <Select.Content>
            {items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
