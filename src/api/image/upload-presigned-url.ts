export const uploadPresignedUrl = async (presignedUrl: string, file: File): Promise<boolean> => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.ok;
};
