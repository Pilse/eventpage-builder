import { v4 as uuidv4 } from "uuid";

export const getPresignedUrl = async (filename: string): Promise<{ url: string }> => {
  const id = uuidv4();
  const idPrefixedFilename = `${filename}-${id}`;

  const res = await fetch(`/api/v1/upload-url?filename=images/${idPrefixedFilename}`);
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json() as Promise<{ url: string }>;
};
