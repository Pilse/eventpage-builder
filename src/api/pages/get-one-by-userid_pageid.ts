import { supabase } from "@/shared/database";

export const getOneByUserId_PageId = (pageId: string, userId?: string) => {
  return userId
    ? supabase
        .from("pages")
        .select("publicId, name, createdAt, publishedAt, updatedAt, isPublished, block")
        .eq("userId", userId)
        .eq("publicId", pageId)
        .eq("isDeleted", false)
        .single()
    : supabase
        .from("pages")
        .select("publicId, name, createdAt, publishedAt, updatedAt, isPublished, block")
        .eq("publicId", pageId)
        .eq("isDeleted", false)
        .single();
};
