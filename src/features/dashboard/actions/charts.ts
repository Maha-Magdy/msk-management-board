"use server";

import db from "@/lib/db";
import { ChartData } from "../types/chart";

export async function getTypeDistribution(): Promise<ChartData[]> {
  const query = `
        SELECT type AS label, COUNT(*) AS value
        FROM suggestions
        GROUP BY type
    `;

  return db.prepare(query).all() as ChartData[];
}

export async function priorityDistribution(): Promise<ChartData[]> {
  const query = `
        SELECT priority AS label, COUNT(*) AS value
        FROM suggestions
        GROUP BY priority
    `;

  return db.prepare(query).all() as ChartData[];
}

export async function getStatusDistribution(): Promise<ChartData[]> {
  const query = `
        SELECT status AS label, COUNT(*) AS value
        FROM suggestions
        GROUP BY status
    `;

  return db.prepare(query).all() as ChartData[];
}

export async function getPendingMonthlyTrend(): Promise<{ data: { month: string; value: number }[]; total: number }> {
  const data = db
    .prepare(
      `
        SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS value
        FROM suggestions
        WHERE status = 'pending'
        GROUP BY month
        ORDER BY month
    `
    )
    .all() as { month: string; value: number }[];

  const total = db
    .prepare(
      `
        SELECT COUNT(*) AS total 
        FROM suggestions 
        WHERE status = 'pending'
    `
    )
    .get() as { total: number };

  return {
    total: total.total,
    data,
  };
}

export async function getInProgressMonthlyTrend(): Promise<{
  data: { month: string; value: number }[];
  total: number;
}> {
  const data = db
    .prepare(
      `
          SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS value
          FROM suggestions
          WHERE status = 'in_progress'
          GROUP BY month
          ORDER BY month
      `
    )
    .all() as { month: string; value: number }[];

  const total = db
    .prepare(
      `
          SELECT COUNT(*) AS total 
          FROM suggestions 
          WHERE status = 'in_progress'
      `
    )
    .get() as { total: number };

  return {
    total: total.total,
    data,
  };
}

export async function getCompletedMonthlyTrend(): Promise<{ data: { month: string; value: number }[]; total: number }> {
  const data = db
    .prepare(
      `
          SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS value
          FROM suggestions
          WHERE status = 'completed'
          GROUP BY month
          ORDER BY month
      `
    )
    .all() as { month: string; value: number }[];

  const total = db
    .prepare(
      `
          SELECT COUNT(*) AS total 
          FROM suggestions 
          WHERE status = 'completed'
      `
    )
    .get() as { total: number };

  return {
    total: total.total,
    data,
  };
}

export async function getOverdueMonthlyTrend(): Promise<{ data: { month: string; value: number }[]; total: number }> {
  const data = db
    .prepare(
      `
          SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS value
          FROM suggestions
          WHERE status = 'overdue'
          GROUP BY month
          ORDER BY month
      `
    )
    .all() as { month: string; value: number }[];

  const total = db
    .prepare(
      `
          SELECT COUNT(*) AS total 
          FROM suggestions 
          WHERE status = 'overdue'
      `
    )
    .get() as { total: number };

  return {
    total: total.total,
    data,
  };
}
