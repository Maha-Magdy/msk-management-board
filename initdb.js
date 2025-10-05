import sql from "better-sqlite3";
const db = sql("msk-management-board.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    riskLevel TEXT NOT NULL CHECK(riskLevel IN ('low', 'medium', 'high'))
    )`
).run();

db.prepare(
  `
    CREATE TRIGGER IF NOT EXISTS update_employees_updated_at
    AFTER UPDATE ON employees
    FOR EACH ROW
    BEGIN
      UPDATE employees 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = OLD.id;
    END;
  `
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    employee_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('exercise', 'equipment', 'behavioural', 'lifestyle')),
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
    completed_at DATETIME,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    source TEXT NOT NULL CHECK (source IN ('vida', 'admin')),
    notes TEXT,
    creator_admin_id INTEGER,
    last_updater_admin_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (creator_admin_id) REFERENCES users(id),
    FOREIGN KEY (last_updater_admin_id) REFERENCES users(id)
    )`
).run();

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS update_suggestions_updated_at
    AFTER UPDATE ON suggestions
    FOR EACH ROW
    BEGIN
      UPDATE suggestions 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = OLD.id;
    END;
    `
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
    employee_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
    )`
).run();

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS update_users_updated_at
      AFTER UPDATE ON users
      FOR EACH ROW
      BEGIN
        UPDATE users 
        SET updated_at = CURRENT_TIMESTAMP 
        WHERE id = OLD.id;
      END;
      `
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS verifications_tokens(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    token TEXT NOT NULL UNIQUE,
    expire_at DATETIME NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`
).run();

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS update_verifications_tokens_updated_at
        AFTER UPDATE ON verifications_tokens
        FOR EACH ROW
        BEGIN
          UPDATE verifications_tokens
          SET updated_at = CURRENT_TIMESTAMP 
          WHERE id = OLD.id;
        END;
    `
).run();

export default db;
