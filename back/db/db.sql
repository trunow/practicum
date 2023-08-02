-- Init DB with console `sqlite3 db/db.sqlite >`
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  token text,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT email_unique UNIQUE (email)
);