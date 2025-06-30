import { supabase } from "@/shared/database";

export const deleteOne = async (pageId: string, userId: string) => {
  return supabase
    .from("pages")
    .update({ isDeleted: true })
    .eq("publicId", pageId)
    .eq("userId", userId)
    .select()
    .single();
};
