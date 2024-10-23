import { Block } from "@/domain/block";
import { useDrag, XYCoord } from "react-dnd";

export type BlockType =
  | "TEXT"
  | "IMAGE"
  | "FRAME_CANVAS"
  | "SECTION"
  | "BLOCK"
  | "FRAME_ROW"
  | "FRAME_COL"
  | "CONTAINER";

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

export type BlockDragOptions = Parameters<
  typeof useDrag<Block, unknown, { isDragging: boolean }>
>[0] extends infer T
  ? T extends (...args: any) => any
    ? Omit<ReturnType<T>, "type">
    : never
  : never;
