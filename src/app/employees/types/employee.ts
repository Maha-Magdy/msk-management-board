export type Employee = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
};
