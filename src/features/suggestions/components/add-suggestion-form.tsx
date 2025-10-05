import { Employee } from "@/features/employees/types/employee";
import { SelectBox } from "@/components/ui/select-box";
import {
  Combobox,
  useComboboxContext,
  useFilter,
  useListCollection,
  Highlight,
  Field,
  Button,
  Fieldset,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { priorities, types } from "../constants/suggestion-options";
import { Priority, Suggestion, Type } from "../types/suggestion";
import { useSuggestions } from "../hooks/use-suggestions";
import { toaster } from "@/components/ui/toaster";

interface AddSuggestionFormProps {
  employees: Employee[];
  callback?: () => void;
}

function ComboboxItem(props: { item: { label: string; value: number } }) {
  const { item } = props;
  const combobox = useComboboxContext();
  return (
    <Combobox.Item item={item} key={item.value}>
      <Combobox.ItemText>
        <Highlight ignoreCase query={combobox.inputValue} styles={{ bg: "blue.300", fontWeight: "medium" }}>
          {item.label}
        </Highlight>
      </Combobox.ItemText>
    </Combobox.Item>
  );
}

export default function AddSuggestionForm({ employees, callback }: AddSuggestionFormProps) {
  const [type, setType] = useState<Type>();
  const [priority, setPriority] = useState<Priority>();
  const [error, setError] = useState<string | null>();
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: employees?.map((employee) => ({ label: employee.name, value: employee.id })) ?? [],
    filter: contains,
  });
  const { addSuggestion } = useSuggestions();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const employee_id = employees.find((employee) => employee.name === formData.get("employee_id"))!.id;
    const description = formData.get("description") as string;

    if (!employee_id || !type || !priority || !description) {
      setError("Please fill in all required fields before submitting the form.");
    } else {
      setError(null);
    }

    const suggestion: Omit<Suggestion, "id" | "created_at" | "updated_at" | "employee_name" | "completed_at"> = {
      employee_id,
      type: type!,
      description,
      status: "pending",
      priority: priority!,
      source: "admin",
      notes: formData.get("notes") as string,
      creator_admin_id: null,
      last_updater_admin_id: null,
    };

    toaster.create({
      description: "A new suggestion has been added.",
      type: "success",
      duration: 10000,
    });

    addSuggestion.mutate({ suggestion });

    if (callback) {
      callback();
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.HelperText>Please provide your suggestion details below.</Fieldset.HelperText>
          {error && <Field.ErrorText>Error, Please fill the missing inputs</Field.ErrorText>}
        </Stack>

        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Employee <Field.RequiredIndicator />
            </Field.Label>

            <Combobox.Root collection={collection} onInputValueChange={(e) => filter(e.inputValue)} openOnClick>
              <Combobox.Control>
                <Combobox.Input placeholder="Type to search" name="employee_id" required />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>

              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>No items found</Combobox.Empty>
                  {collection.items.map((item) => (
                    <ComboboxItem item={item} key={item.value} />
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox.Root>
          </Field.Root>

          <Field.Root required>
            <SelectBox
              label="Type"
              placeholder="Select a suggestion type"
              maxWidth="full"
              items={types}
              value={type}
              onChange={(value) => setType(value as Type)}
              required
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Description <Field.RequiredIndicator />
            </Field.Label>
            <Textarea name="description" placeholder="Describe your suggestion in detail" required />
          </Field.Root>

          <Field.Root required>
            <SelectBox
              label="Priority"
              placeholder="Choose priority level"
              maxWidth="full"
              items={priorities}
              value={priority}
              onChange={(value) => setPriority(value as Priority)}
              required
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Notes</Field.Label>
            <Textarea name="notes" placeholder="Add any additional notes (optional)" />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf={{ base: "auto", lg: "flex-end" }}
          px="8"
          bgColor="blue.400"
          _hover={{ backgroundColor: "blue.500" }}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
}
