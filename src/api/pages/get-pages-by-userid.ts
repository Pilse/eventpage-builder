import { supabase } from "../database";

export const getPagesByUserId = (userId: string) => {
  return supabase.from("pages").select().eq("userId", userId).eq("isDeleted", false);
};
