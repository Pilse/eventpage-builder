"use server";

import { updateOne } from "@/api/pages";
import { revalidatePath } from "next/cache";

export const unpublishPage = async (pageId: string, userId: string) => {
  try {
    const { data, error } = await updateOne({
      pageId,
      userId,
      payload: { isPublished: false, publishedAt: null },
    });

    if (error) {
      throw error;
    }

    revalidatePath(`/p/${data.publicId}`);
    revalidatePath(`/console`);

    return data.publicId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
