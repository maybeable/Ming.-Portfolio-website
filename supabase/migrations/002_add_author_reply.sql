-- Add author reply columns to feedback table
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS author_reply TEXT;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS author_replied_at TIMESTAMPTZ;
