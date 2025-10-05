"use client";

import { Box, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import TypeChart from "./dashboard/components/type-chart";
import PriorityChart from "./dashboard/components/priority-chart";
import SparkLine from "./dashboard/components/sparkline-chart";
import { MonthlyChartData } from "./dashboard/types/chart";
import {
  getCompletedMonthlyTrend,
  getInProgressMonthlyTrend,
  getOverdueMonthlyTrend,
  getPendingMonthlyTrend,
} from "./dashboard/actions/charts";
import SparklineCard from "./dashboard/components/sparkline-card";
import { useEffect, useState } from "react";

const initialMonthlyChartData = {
  data: [],
  total: 0,
  isLoading: true,
};

export default function Dashboard() {
  const [pendingData, setPendingData] = useState<MonthlyChartData>(initialMonthlyChartData);
  const [inProgressData, setInProgressData] = useState<MonthlyChartData>(initialMonthlyChartData);
  const [completedData, setCompletedData] = useState<MonthlyChartData>(initialMonthlyChartData);
  const [overdueData, setOverdueData] = useState<MonthlyChartData>(initialMonthlyChartData);

  useEffect(() => {
    setPendingData((pendingData) => ({ ...pendingData, isLoading: true }));
    getPendingMonthlyTrend().then((data) => {
      setPendingData({
        data: data.data.map((item) => ({ value: item.value })),
        total: data.total,
        isLoading: false,
      });
    });

    setInProgressData((inProgressData) => ({ ...inProgressData, isLoading: true }));
    getInProgressMonthlyTrend().then((data) => {
      setInProgressData({
        data: data.data.map((item) => ({ value: item.value })),
        total: data.total,
        isLoading: false,
      });
    });

    setCompletedData((completedData) => ({ ...completedData, isLoading: true }));
    getCompletedMonthlyTrend().then((data) => {
      setCompletedData({
        data: data.data.map((item) => ({ value: item.value })),
        total: data.total,
        isLoading: false,
      });
    });

    setOverdueData((overdueData) => ({ ...overdueData, isLoading: true }));
    getOverdueMonthlyTrend().then((data) => {
      setOverdueData({
        data: data.data.map((item) => ({ value: item.value })),
        total: data.total,
        isLoading: false,
      });
    });
  }, []);

  return (
    <Box>
      <Flex width="full" gap={4} mb={4} direction={{ base: "column", md: "row" }}>
        <SparklineCard
          title="Pending"
          total={pendingData.total}
          color="yellow.100"
          flexGrow={1}
          maxWidth={{ sm: "calc(100% - 16px)", md: "initial" }}
          isLoading={pendingData.isLoading}
        >
          <SparkLine data={pendingData.data} color="yellow.solid" />
        </SparklineCard>

        <SparklineCard
          title="In Progress"
          total={inProgressData.total}
          color="blue.100"
          flexGrow={1}
          maxWidth={{ sm: "calc(100% - 16px)", md: "initial" }}
          isLoading={inProgressData.isLoading}
        >
          <SparkLine data={inProgressData.data} color="blue.solid" />
        </SparklineCard>

        <SparklineCard
          title="Completed"
          total={completedData.total}
          color="green.100"
          flexGrow={1}
          maxWidth={{ sm: "calc(100% - 16px)", md: "initial" }}
          isLoading={completedData.isLoading}
        >
          <SparkLine data={completedData.data} color="green.solid" />
        </SparklineCard>

        <SparklineCard
          title="Overdue"
          total={overdueData.total}
          color="red.100"
          flexGrow={1}
          maxWidth={{ sm: "calc(100% - 16px)", md: "initial" }}
          isLoading={overdueData.isLoading}
        >
          <SparkLine data={overdueData.data} color="red.solid" />
        </SparklineCard>
      </Flex>

      <Grid
        gridTemplateColumns={{ sm: "auto", md: "1fr 1fr" }}
        alignItems="center"
        gap={4}
        maxWidth={{ sm: "calc(100% - 16px)", md: "full" }}
      >
        <GridItem>
          <Card.Root>
            <Card.Body p={4} paddingLeft={{ sm: 4, md: 0 }}>
              <TypeChart />
            </Card.Body>
          </Card.Root>
        </GridItem>

        <GridItem h="full">
          <Card.Root h="full">
            <Card.Body p={4} justifyContent="center">
              <PriorityChart />
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
