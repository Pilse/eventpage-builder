import { Block } from "@/domain/block";
import { XYCoord } from "react-dnd";

export type BlockType = "TEXT" | "FRAME" | "SECTION" | "BLOCK" | "FRAME_ROW" | "FRAME_COL";

export type ParentBlockType = (Block & { children: InstanceType<typeof Block>[] }) | null;

export type Position = { t: number; r: number; b: number; l: number };

export type Size = { width: number; height: number };

export type Layout = Position & Size;

export type LayoutMap = Record<string, Layout>;

export type Offset = XYCoord;
export interface IBlockProps<T extends InstanceType<typeof Block>> {
  block: T;
  isPreview?: boolean;
}
