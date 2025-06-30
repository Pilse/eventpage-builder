import { supabase } from "@/shared/database";

export const getManyByIsPublished = () => {
  return supabase.from("pages").select("name, page, publicId").eq("isDeleted", false).eq("isPublished", true);
};
