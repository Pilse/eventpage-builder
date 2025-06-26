import { Database } from "../database.types";

export type Page = Database["public"]["Tables"]["pages"]["Row"];

export type PageTableItem = Pick<Page, "createdAt" | "isPublished" | "publishedAt" | "updatedAt" | "name"> & {
  id: string;
};

export const pagesToPageTableItems = (pages: Page[]): PageTableItem[] => {
  return pages.map((page) => ({
    id: page.publicId,
    name: page.name,
    createdAt: page.createdAt,
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
    isPublished: page.isPublished,
  }));
};
