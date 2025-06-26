"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathServerAction = async (pathName: string) => {
  revalidatePath(pathName);
};
