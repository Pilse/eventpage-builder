import { Page } from "@/domain/pages";
import { supabase } from "@/shared/database";

export const updateOne = async ({
  userId,
  pageId,
  payload,
}: {
  userId: string;
  pageId: string;
  payload: Partial<Pick<Page, "name" | "block" | "isPublished" | "publishedAt" | "isDeleted" | "deletedAt">>;
}) => {
  return supabase
    .from("pages")
    .update({
      ...payload,
    })
    .eq("userId", userId)
    .eq("publicId", pageId)
    .select()
    .single();
};
