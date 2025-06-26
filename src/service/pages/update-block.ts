"use server";

import { updateOne } from "@/api/pages";
import { Container } from "@/domain/builder";

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

    return data.publicId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
