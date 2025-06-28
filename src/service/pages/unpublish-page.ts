"use server";

import { updateOne } from "@/api/pages";

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

    return data.publicId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
