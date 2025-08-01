import { supabase } from "@/shared/database";

export const getOneByPageId = (pageId: string, userId?: string) => {
  return userId
    ? supabase
        .from("pages")
        .select("publicId, name, createdAt, publishedAt, updatedAt, isPublished, block, page")
        .eq("userId", userId)
        .eq("publicId", pageId)
        .eq("isDeleted", false)
        .single()
    : supabase
        .from("pages")
        .select("publicId, name, createdAt, publishedAt, updatedAt, isPublished, block, page")
        .eq("publicId", pageId)
        .eq("isDeleted", false)
        .single();
};
