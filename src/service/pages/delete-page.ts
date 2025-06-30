"use server";

import { deleteOne } from "@/api/pages";
import { revalidatePath } from "next/cache";

export const deletePage = async (pageId: string, userId: string) => {
  try {
    const { data, error } = await deleteOne(pageId, userId);

    if (error) {
      throw error;
    }

    revalidatePath(`/console`);
    revalidatePath(`/p/${pageId}`);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
