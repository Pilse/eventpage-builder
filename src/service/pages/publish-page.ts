"use server";

import { updateOne } from "@/api/pages";
import { Container } from "@/domain/builder";
import dayjs from "dayjs";

export const publishPage = async (
  pageId: string,
  userId: string,
  block: ReturnType<Container["serialize"]>
) => {
  try {
    const { data, error } = await updateOne({
      pageId,
      userId,
      payload: { block, page: block, isPublished: true, publishedAt: dayjs().toISOString() },
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
