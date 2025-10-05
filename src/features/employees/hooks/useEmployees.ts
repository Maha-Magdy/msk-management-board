import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../lib/employees";
import { Employee } from "../types/employee";

export default function useEmployees() {
  const getEmployeesQuery = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: (): Employee[] => getEmployees() as unknown as Employee[],
  });

  return {
    getEmployeesQuery,
  };
}
