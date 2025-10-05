"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { ChartData } from "../types/chart-data";
import { getTypeDistribution } from "../actions/charts";

export default function TypeChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const yAxisMax = Math.max(...data.map((item) => Number(item.value)));

  const chartData = data.map((item) => ({
    allocation: (Number(item.value) / yAxisMax) * 100,
    type: item.label.charAt(0).toUpperCase() + item.label.slice(1),
    value: item.value,
  }));

  const chart = useChart({
    data: chartData,
    series: [{ name: "allocation", color: "blue.400" }],
  });

  useEffect(() => {
    getTypeDistribution().then(setData);
  }, []);

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          tickLine={false}
          stroke={chart.color("border")}
          dataKey={chart.key("type")}
          style={{ fontWeight: "600" }}
        />
        <YAxis
          tickLine={false}
          stroke={chart.color("border")}
          style={{ fontWeight: "600" }}
          tickFormatter={(value) => `${value}%`}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            stroke={chart.color("border")}
          >
            <LabelList dataKey={chart.key("value")} position="top" style={{ fill: chart.color("fg") }} />
          </Bar>
        ))}
      </BarChart>
    </Chart.Root>
  );
}
