import { Block } from "@/domain/block";
import { useDrag, XYCoord } from "react-dnd";

export type BlockType =
  | "BLOCK"
  | "TEXT"
  | "IMAGE"
  | "SECTION_CANVAS"
  | "SECTION_ROW"
  | "SECTION_COL"
  | "FRAME_CANVAS"
  | "FRAME_ROW"
  | "FRAME_COL"
  | "CONTAINER";

export type ParentBlockType = (Block & { children: InstanceType<typeof Block>[] }) | null;

export type Position = { t: number; r: number; b: number; l: number };

export type Size = { width: number; height: number };

export type Layout = Position & Size;

export type Color = { r: number; g: number; b: number; a: number };

export type Shadow = { x: number; y: number; blur: number; spread: number; color: Color };

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
