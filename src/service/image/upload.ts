import { getPresignedUrl, uploadPresignedUrl } from "@/api/image";

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const { url: presignedUrl } = await getPresignedUrl(file.name);

    const uploaded = await uploadPresignedUrl(presignedUrl, file);

    if (uploaded) {
      return presignedUrl.split("?")[0];
    }

    throw new Error("Image upload failed");
  } catch (error) {
    return null;
  }
};
