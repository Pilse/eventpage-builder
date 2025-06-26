import { Database } from "../database.types";

export type Page = Database["public"]["Tables"]["pages"]["Row"];

export type PageTableItem = Pick<Page, "createdAt" | "isPublished" | "publishedAt" | "updatedAt" | "name"> & {
  id: string;
};
