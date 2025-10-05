"use server";

import db from "@/lib/db";
import { ChartData } from "../types/chart-data";

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
        SELECT priority AS label, COUNT(*) AS value,
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
