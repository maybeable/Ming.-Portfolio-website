-- Create feedback_replies table for multi-reply support
CREATE TABLE feedback_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_author BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Migrate existing author_reply data into the new table
INSERT INTO feedback_replies (feedback_id, content, is_author, created_at)
SELECT id, author_reply, TRUE, author_replied_at
FROM feedback
WHERE author_reply IS NOT NULL;
