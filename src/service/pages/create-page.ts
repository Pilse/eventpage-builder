"use server";

import { insert } from "@/api/pages";
import { Container } from "@/domain/builder";

export const createPage = async ({
  userId,
  name,
  serialized,
}: {
  userId: string;
  name: string;
  serialized: ReturnType<Container["serialize"]>;
}) => {
  try {
    const { statusText, error, data } = await insert({ userId, name, serialized });

    if (error) {
      throw new Error(statusText);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
