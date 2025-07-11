"use server";

import { getManyByUserId } from "@/api/pages";

export const getPages = async (userId: string) => {
  try {
    const { data, error, statusText } = await getManyByUserId(userId);

    if (error) {
      throw new Error(statusText);
    }

    return {
      count: data.length,
      pages: data,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
