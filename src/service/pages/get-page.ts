import { getOneByUserId_PageId } from "@/api/pages";

export const getPage = async (pageId: string, userId: string) => {
  try {
    const { data, error, statusText } = await getOneByUserId_PageId(pageId, userId);

    if (error) {
      throw new Error(statusText);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
