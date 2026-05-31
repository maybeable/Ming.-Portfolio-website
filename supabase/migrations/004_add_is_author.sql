-- Add is_author flag for author verification
ALTER TABLE feedback ADD COLUMN is_author BOOLEAN DEFAULT FALSE;
