import { Block } from "@/domain/block";
import {
  ChildrenMixinBlockType,
  DragMixinBlockType,
  DropMixinBlockType,
  DropRowMixinBlockType,
  ResizeMixinBlockType,
  SnapMixinBlockType,
} from "@/domain/mixin";
import { DropColMixinBlockType } from "@/domain/mixin/drop-col";

export const hasResizeMixin = (block: Block): block is ResizeMixinBlockType => {
  return Object.hasOwn(block, "resizable");
};

export const hasDragMixin = (block: Block): block is DragMixinBlockType => {
  return Object.hasOwn(block, "draggable");
};

export const hasDropMixin = (block: Block): block is DropMixinBlockType => {
  return Object.hasOwn(block, "droppable");
};

export const hasChildrenMixin = (block: Block): block is ChildrenMixinBlockType => {
  return Object.hasOwn(block, "placeable");
};

export const hasSnapMixin = (block: Block): block is SnapMixinBlockType => {
  return Object.hasOwn(block, "snappable");
};

export const hasDropRowMixin = (block: Block): block is DropRowMixinBlockType => {
  return Object.hasOwn(block, "rowDroppable");
};

export const hasDropColMixin = (block: Block): block is DropColMixinBlockType => {
  return Object.hasOwn(block, "colDroppable");
};

export const isAutoLayouted = (block: Block) => {
  return !!(block.parent && (hasDropRowMixin(block.parent) || hasDropColMixin(block.parent)));
};
