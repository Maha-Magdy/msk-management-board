"use server";

import db from "@/lib/db";
import { Filters } from "../types/filters";
import { Status, Suggestion } from "../types/suggestion";
import xss from "xss";

export async function getSuggestions(filters?: Filters): Promise<Suggestion[]> {
  let query = `
    SELECT s.*, e.name AS employee_name
    FROM suggestions s
    JOIN employees e ON s.employee_id = e.id
    WHERE 1=1
  `;
  const params = [];

  if (filters?.type) {
    query += ` AND type = ?`;
    params.push(filters.type);
  }

  if (filters?.status) {
    query += ` AND status = ?`;
    params.push(filters.status);
  }

  if (filters?.priority) {
    query += ` AND priority = ?`;
    params.push(filters.priority);
  }

  if (filters?.source) {
    query += `AND source = ?`;
    params.push(filters.source);
  }

  if (filters?.search) {
    query += ` AND (e.name LIKE ? OR e.id = ?)`;
    params.push(`%${filters.search}%`, Number(filters.search) || -1);
  }

  query += ` ORDER BY s.created_at DESC`;

  return db.prepare(query).all(...params) as Suggestion[];
}

export async function updateSuggestionStatus(id: number, status: Status): Promise<Suggestion> {
  const query = `
    UPDATE suggestions
    SET status = ?
    WHERE id = ?
  `;

  const result = db.prepare(query).run(status, id);

  if (result.changes === 0) {
    throw new Error(`Suggestion with id ${id} not found`);
  }

  console.log(`✅ The suggestion with ID ${id} has had its status updated!`);

  return db
    .prepare(
      `
    SELECT s.*, e.name AS employee_name
    FROM suggestions s
    JOIN employees e ON s.employee_id = e.id
    WHERE s.id = ?
    `
    )
    .get(id) as Suggestion;
}

export async function updateSuggestionsStatus(ids: number[], status: Status): Promise<Suggestion[]> {
  if (!ids.length) return [];

  const query = `
    UPDATE suggestions
    SET status = ?
    WHERE id IN (${ids.map(() => "?").join(",")})
  `;

  const result = db.prepare(query).run(status, ...ids);

  if (result.changes === 0 || result.changes !== ids.length) {
    throw new Error("Suggestions were not updated properly");
  }

  console.log(`✅ Successfully updated the status of ${result.changes} suggestions!`);

  return db
    .prepare(
      `
    SELECT s.*, e.name AS employee_name 
    FROM suggestions s
    JOIN employees e ON s.employee_id = e.id
    WHERE s.id IN (${ids.map(() => "?").join(",")})
    `
    )
    .all(...ids) as Suggestion[];
}

export async function saveSuggestion(
  suggestion: Omit<Suggestion, "id" | "created_at" | "updated_at" | "employee_name" | "completed_at">
) {
  suggestion.description = xss(suggestion.description);
  suggestion.notes = suggestion.notes ? xss(suggestion.notes) : "";

  db.prepare(
    `
    INSERT INTO suggestions
     (employee_id, type, description, status, priority, source, notes, creator_admin_id, last_updater_admin_id)
    VALUES (
      @employee_id,
      @type,
      @description,
      @status,
      @priority,
      @source,
      @notes,
      @creator_admin_id,
      @last_updater_admin_id
    )
    `
  ).run(suggestion);

  console.log("✅ A new suggestion has been added!");
}
