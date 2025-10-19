"use client";

import { useChart, Chart } from "@chakra-ui/charts";
import { useEffect, useState } from "react";
import { PieChart, Tooltip, Pie, Cell, Legend } from "recharts";
import { ChartData } from "../types/chart";
import { priorityDistribution } from "../actions/charts";
import { Skeleton, useBreakpointValue } from "@chakra-ui/react";

export default function PriorityChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMobileView = useBreakpointValue({ base: true, lg: false });

  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
    color: item.label === "low" ? "green.500" : item.label === "medium" ? "yellow.500" : "red.500",
  }));

  const chart = useChart({
    data: chartData,
  });

  useEffect(() => {
    setIsLoading(true);
    priorityDistribution().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Skeleton height="385px"/>;
  }

  return (
    <Chart.Root boxSize="250px" chart={chart} mx="auto">
      <PieChart>
        <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip hideLabel />} />
        <Legend content={<Chart.Legend />} wrapperStyle={{ bottom: isMobileView ? -5 : -45 }} />
        <Pie
          isAnimationActive={true}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          outerRadius={100}
          innerRadius={0}
          labelLine={false}
          label={
            !isMobileView
              ? ({ name, index }) => {
                  const { value } = chart.data[index ?? -1];
                  const percent = Number(value) / chart.getTotal("value");
                  return `${name}: ${(percent * 100).toFixed(1)}%`;
                }
              : undefined
          }
        >
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />;
          })}
        </Pie>
      </PieChart>
    </Chart.Root>
  );
}
