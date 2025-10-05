"use server";

import db from "@/lib/db";

export async function getEmployees() {
  const query = `
    SELECT * FROM employees
  `;

  return db.prepare(query).all();
}
