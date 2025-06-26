"use server";

import { getOneByPageId } from "@/api/pages";

export const getPage = async (pageId: string, userId?: string) => {
  try {
    const { data, error, statusText } = await getOneByPageId(pageId, userId);

    if (error) {
      throw new Error(statusText);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
