import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Filters } from "../types/filters";
import {
  getSuggestions,
  saveSuggestion,
  updateSuggestionsStatus,
  updateSuggestionStatus,
} from "../actions/suggestions";
import { Status, Suggestion } from "../types/suggestion";

export function useSuggestions(filters?: Filters) {
  const queryClient = useQueryClient();

  const getSuggestionsQuery = useQuery({
    queryKey: ["suggestions", filters],
    queryFn: () => getSuggestions(filters),
  });

  const suggestionStatusMutation = useMutation({
    mutationKey: ["updateSuggestionStatus"],
    mutationFn: ({ id, status }: { id: number; status: Status }) => updateSuggestionStatus(id, status),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["suggestions", filters] });

      const prevData = queryClient.getQueryData(["suggestions", filters]);

      queryClient.setQueryData(["suggestions", filters], (old: Suggestion[]) =>
        old.map((row: Suggestion) => (row.id === updated.id ? { ...row, ...updated } : row))
      );

      return { prevData };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevData) {
        queryClient.setQueryData(["suggestions", filters], ctx.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions", filters] });
    },
  });

  const suggestionsStatusMutation = useMutation({
    mutationKey: ["updateSuggestionsStatus"],
    mutationFn: ({ ids, status }: { ids: number[]; status: Status }) => updateSuggestionsStatus(ids, status),
    onMutate: async ({ ids, status }) => {
      await queryClient.cancelQueries({ queryKey: ["suggestions", filters] });
      const prevData = queryClient.getQueryData(["suggestions", filters]);

      queryClient.setQueryData(["suggestions", filters], (old: Suggestion[]) =>
        old.map((row) => (ids.includes(row.id) ? { ...row, status } : row))
      );

      return { prevData };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevData) {
        queryClient.setQueryData(["suggestions", filters], ctx.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions", filters] });
    },
  });

  const addSuggestion = useMutation({
    mutationKey: ["addSuggestion"],
    mutationFn: ({
      suggestion,
    }: {
      suggestion: Omit<Suggestion, "id" | "created_at" | "updated_at" | "employee_name" | "completed_at">;
    }) => saveSuggestion(suggestion),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["suggestions", filters] });

      const prevData = queryClient.getQueryData(["suggestions", filters]);

      queryClient.setQueryData(["suggestions", filters], (old: Suggestion[]) => {
        return [{ ...updated.suggestion, id: Date.now(), created_at: Date.now() }, ...(old ?? [])];
      });

      return { prevData };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevData) {
        queryClient.setQueryData(["suggestions", filters], ctx.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions", filters] });
    },
  });

  return {
    getSuggestionsQuery,
    suggestionStatusMutation,
    suggestionsStatusMutation,
    addSuggestion,
  };
}
