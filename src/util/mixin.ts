import { Block } from "@/domain/block";
import {
  ChildrenMixinBlockType,
  DragMixinBlockType,
  DropCanvasMixinBlockType,
  DropRowMixinBlockType,
  ResizeMixinBlockType,
  DragSnapMixinBlockType,
  ResizeSnapMixinBlockType,
  BackgroundMixinBlockType,
} from "@/domain/mixin";
import { DropColMixinBlockType } from "@/domain/mixin/drop/drop-col";

export const hasResizeMixin = (block: Block): block is ResizeMixinBlockType => {
  return Object.hasOwn(block, "resizable");
};

export const hasDragMixin = (block: Block): block is DragMixinBlockType => {
  return Object.hasOwn(block, "draggable");
};

export const hasChildrenMixin = (block: Block): block is ChildrenMixinBlockType => {
  return Object.hasOwn(block, "placeable");
};

export const hasDragSnapMixin = (block: Block): block is DragSnapMixinBlockType => {
  return Object.hasOwn(block, "dragSnappable");
};

export const hasResizeSnapMixin = (block: Block): block is ResizeSnapMixinBlockType => {
  return Object.hasOwn(block, "resizeSnappable");
};

export const hasDropCanvasMixin = (block: Block): block is DropCanvasMixinBlockType => {
  return Object.hasOwn(block, "droppable");
};

export const hasDropRowMixin = (block: Block): block is DropRowMixinBlockType => {
  return Object.hasOwn(block, "rowDroppable");
};

export const hasDropColMixin = (block: Block): block is DropColMixinBlockType => {
  return Object.hasOwn(block, "colDroppable");
};

export const hasBackgroundMixin = (block: Block): block is BackgroundMixinBlockType => {
  return Object.hasOwn(block, "fillable");
};

export const isAutoLayouted = (block: Block) => {
  return !!(block.parent && (hasDropRowMixin(block.parent) || hasDropColMixin(block.parent)));
};
