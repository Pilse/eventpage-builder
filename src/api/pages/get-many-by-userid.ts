import { supabase } from "@/shared/database";

export const getManyByUserId = (userId: string) => {
  return supabase
    .from("pages")
    .select("publicId, name, createdAt, publishedAt, updatedAt, isPublished")
    .eq("userId", userId)
    .eq("isDeleted", false);
};
