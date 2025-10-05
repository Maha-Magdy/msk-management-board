export type Type = "exercise" | "equipment" | "behavioural" | "lifestyle";

export type Status = "pending" | "in_progress" | "completed" | "overdue";

export type Priority = "low" | "medium" | "high";

export type Source = "vida" | "admin";

export type Suggestion = {
  id: number;
  created_at: string;
  updated_at: string;
  employee_id: number;
  employee_name: string;
  type: Type;
  description: string;
  status: Status;
  completed_at?: string;
  priority: Priority;
  source: Source;
  notes?: string;
  creator_admin_id?: number | null;
  last_updater_admin_id?: number | null;
};
