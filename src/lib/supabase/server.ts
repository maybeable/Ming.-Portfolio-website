import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing env.SUPABASE_URL");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
}

function getAnonKey(): string {
  return supabaseAnonKey || supabaseServiceRoleKey!;
}

/** 公共只读 + 公开插入（RLS 保护）。若未配置 anon key 则退化为 service_role */
export const supabase = createClient(supabaseUrl, getAnonKey());

/** 管理操作（绕过 RLS）— 仅用于 reply/manage/pin/cleanup */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
