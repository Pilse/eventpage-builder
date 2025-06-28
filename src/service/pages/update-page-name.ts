"use server";

import { updateOne } from "@/api/pages";
import { revalidatePath } from "next/cache";

export const updatePageName = async (pageId: string, userId: string, name: string) => {
  try {
    const { data, error } = await updateOne({
      pageId,
      userId,
      payload: { name },
    });

    if (error) {
      throw error;
    }

    revalidatePath("/console");

    return data.name;
  } catch (error) {
    console.error(error);
    return null;
  }
};
