-- 003_add_soft_delete.sql
-- 为 feedback 表增加软删除支持

ALTER TABLE feedback
  ADD COLUMN IF NOT EXISTS deleted BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE feedback
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 更新公开读取策略：仅展示未删除的留言
DROP POLICY IF EXISTS "Allow public read" ON feedback;

CREATE POLICY "Allow public read" ON feedback
  FOR SELECT
  USING (deleted = FALSE);
