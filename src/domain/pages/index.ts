import { Database } from "../database.types";

export type Page = Database["public"]["Tables"]["pages"]["Row"];

export type PageTableItem = Pick<Page, "createdAt" | "isPublished" | "publishedAt" | "updatedAt"> & {
  id: string;
};

export const pagesToPageTableItems = (pages: Page[]): PageTableItem[] => {
  return pages.map((page) => ({
    createdAt: page.createdAt,
    id: page.publicId,
    isPublished: page.isPublished,
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
  }));
};
