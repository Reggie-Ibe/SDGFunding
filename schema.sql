-- schema.sql

DROP TABLE IF EXISTS users, projects, milestones, investments, wallets CASCADE;

-- Users table (Admin, Investor, Innovator)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'investor', 'innovator')) NOT NULL,
  verified BOOLEAN DEFAULT FALSE
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  funding_goal NUMERIC NOT NULL,
  current_funding NUMERIC DEFAULT 0,
  innovator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Milestones for projects
CREATE TABLE milestones (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE
);

-- Wallets (virtual investor wallets)
CREATE TABLE wallets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE
);

-- Investments made by investors into projects
CREATE TABLE investments (
  id SERIAL PRIMARY KEY,
  investor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  invested_at TIMESTAMP DEFAULT NOW()
);

-- Demo data for users
INSERT INTO users (name, email, password, role, verified) VALUES
('Alice Admin', 'admin@sdg.com', 'adminhashedpass', 'admin', TRUE),
('Bob Investor', 'investor@sdg.com', 'investorhashedpass', 'investor', TRUE),
('Cathy Creator', 'innovator@sdg.com', 'innovatorhashedpass', 'innovator', TRUE);

-- Demo wallets
INSERT INTO wallets (user_id, amount, verified) VALUES
(2, 10000, TRUE); -- Bob Investor

-- Demo projects
INSERT INTO projects (title, description, category, funding_goal, innovator_id) VALUES
('Clean Water Tech', 'A portable water purification system.', 'Clean Water', 5000, 3),
('Solar Cart', 'Solar-powered cart for off-grid transport.', 'Affordable Energy', 8000, 3);

-- Demo milestones
INSERT INTO milestones (project_id, description, due_date) VALUES
(1, 'Build prototype', '2025-06-01'),
(1, 'Field test in rural area', '2025-07-15'),
(2, 'Design solar panel mount', '2025-05-20');
