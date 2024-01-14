import { Block } from "@/domain/block";
import {
  ChildrenMixinBlockType,
  DragdropMixinBlockType,
  ResizeMixinBlockType,
  SnapMixinBlockType,
} from "@/domain/mixin";

export const hasResizeMixin = (block: Block): block is ResizeMixinBlockType => {
  return Object.hasOwn(block, "resizable");
};

export const hasDragdropMixin = (block: Block): block is DragdropMixinBlockType => {
  return Object.hasOwn(block, "draggable");
};

export const hasChildrenMixin = (block: Block): block is ChildrenMixinBlockType => {
  return Object.hasOwn(block, "placeable");
};

export const hasSnapMixin = (block: Block): block is SnapMixinBlockType => {
  return Object.hasOwn(block, "snappable");
};
