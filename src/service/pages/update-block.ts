"use server";

import { updateOne } from "@/api/pages";
import { Container } from "@/domain/builder";
import { revalidatePath } from "next/cache";

export const updateBlock = async (
  pageId: string,
  userId: string,
  block: ReturnType<Container["serialize"]>
) => {
  try {
    const { data, error } = await updateOne({
      pageId,
      userId,
      payload: { block },
    });

    if (error) {
      throw error;
    }

    revalidatePath(`/pages/${pageId}/preview`);

    return data.publicId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
