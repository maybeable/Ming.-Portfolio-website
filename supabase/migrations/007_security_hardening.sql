-- 007_security_hardening.sql
-- 收紧 feedback 表的 RLS 策略，防止匿名用户直接写入

-- 移除过于宽松的插入策略（API 通过 service_role 写入，不受 RLS 限制）
DROP POLICY IF EXISTS "Allow service insert" ON feedback;

-- 确保不存在匿名 UPDATE / DELETE 策略
DROP POLICY IF EXISTS "Allow public update" ON feedback;
DROP POLICY IF EXISTS "Allow public delete" ON feedback;

-- 公开读取：仅展示未删除、未软删除的留言
DROP POLICY IF EXISTS "Allow public read" ON feedback;
CREATE POLICY "Allow public read" ON feedback
  FOR SELECT
  USING (deleted = FALSE);
