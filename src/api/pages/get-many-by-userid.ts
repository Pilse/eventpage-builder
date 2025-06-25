import { supabase } from "@/shared/database";

export const getManyByUserId = (userId: string) => {
  return supabase.from("pages").select().eq("userId", userId).eq("isDeleted", false);
};
