CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  username    TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password    TEXT NOT NULL,
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  date        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  duration    INTEGER NOT NULL,
  intensity   INTEGER NOT NULL CHECK (intensity BETWEEN 1 AND 10),
  date        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutritions (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  quantity    INTEGER NOT NULL,
  calories    INTEGER NOT NULL,
  image_url   TEXT NOT NULL,
  date        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sleeps (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date  TIMESTAMP NOT NULL,
  end_date    TIMESTAMP NOT NULL CHECK (end_date > start_date),
  date        TIMESTAMP NOT NULL DEFAULT NOW()
);