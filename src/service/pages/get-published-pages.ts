"use server";

import { getManyByIsPublished } from "@/api/pages";

export const getPublishedPages = async () => {
  try {
    const { data, error, statusText } = await getManyByIsPublished();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
