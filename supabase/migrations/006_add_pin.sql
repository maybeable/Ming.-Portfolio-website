-- Add pin support to feedback table
ALTER TABLE feedback
ADD COLUMN is_pinned BOOLEAN DEFAULT FALSE,
ADD COLUMN pinned_at TIMESTAMPTZ;

-- Index for efficient sorting of pinned items
CREATE INDEX idx_feedback_is_pinned ON feedback(is_pinned, pinned_at DESC NULLS LAST);
