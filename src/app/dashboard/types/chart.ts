export type ChartData = {
  label: string;
  value: string;
};

export type MonthlyChartData = {
  data: { value: number }[];
  total: number;
  isLoading: boolean
};
