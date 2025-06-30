"use server";

import { insert } from "@/api/pages";
import { Container } from "@/domain/builder";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/console`);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
