-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  name TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON feedback
  FOR SELECT
  USING (true);

-- Allow insert via service_role (authenticated insert)
CREATE POLICY "Allow service insert" ON feedback
  FOR INSERT
  WITH CHECK (true);
