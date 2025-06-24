"use server";

import { signIn } from "@/auth";

export const signInAction = async (...args: Parameters<typeof signIn>) => {
  return signIn(...args);
};
