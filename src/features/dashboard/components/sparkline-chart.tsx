"use client";

import { useChart, Chart } from "@chakra-ui/charts";
import { AreaChart, Area } from "recharts";

interface SparkLineChartProps {
  data: { value: number }[];
  color: string;
}

export default function SparkLineChart({ data, color }: SparkLineChartProps) {
  const chart = useChart({
    data: data,
    series: [{ color: color }],
  });

  return (
    <Chart.Root height="10" chart={chart}>
      <AreaChart data={chart.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  );
}
