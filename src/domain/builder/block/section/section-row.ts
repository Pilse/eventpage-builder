import {
  BackgroundMixin,
  DragMixin,
  DropRowMixin,
  ResizeMixin,
  ResizeSnapMixin,
} from "@/domain/builder/mixin";
import { Block, BlockFactory, ImageBlock, TextBlock } from "@/domain/builder";
import { LayoutMap } from "@/type";

type ChildBlock = InstanceType<typeof TextBlock> | InstanceType<typeof ImageBlock>;

export class SectionRow extends Block {
  public children: ChildBlock[] = [];
  public gap: number = 0;
  public alignVertical: "top" | "center" | "bottom" = "top";
  public alignHorizontal: "left" | "center" | "right" = "left";

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
      gap: number;
      alignVertical: "top" | "center" | "bottom";
      alignHorizontal: "left" | "center" | "right";
    },
    deserialize = true
  ) {
    super({ ...initState, type: "SECTION_ROW" });
    this.gap = initState.gap;
    this.alignVertical = initState.alignVertical;
    this.alignHorizontal = initState.alignHorizontal;
    this.children = (initState.children.map((child) =>
      deserialize ? BlockFactory.deserialize(child, this) : BlockFactory.create(child, this)
    ) ?? []) as ChildBlock[];
  }

  public getLayoutMap() {
    const layoutMap: LayoutMap = {};
    for (const child of this.children) {
      layoutMap[child.id] = {
        t: child.t,
        r: child.r,
        b: child.b,
        l: child.l,
        width: child.width,
        height: child.height,
      };
    }
    layoutMap[this.id] = {
      t: 0,
      r: 0,
      b: 0,
      l: 0,
      width: this.width,
      height: this.height,
    };

    layoutMap["centerX"] = {
      t: Math.floor(this.height / 2),
      r: 0,
      b: 0,
      l: 0,
      width: this.width,
      height: 1,
    };

    layoutMap["centerY"] = {
      t: 0,
      r: 0,
      b: 0,
      l: this.l + Math.floor(this.width / 2),
      width: 1,
      height: this.height,
    };

    return layoutMap;
  }

  public serialize() {
    return {
      ...super.serialize(),
      gap: this.gap,
      alignVertical: this.alignVertical,
      alignHorizontal: this.alignHorizontal,
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "SECTION_ROW" as const,
    };
  }

  static deserialize(serialized: ReturnType<SectionRow["serialize"]>) {
    return new SectionRow(serialized);
  }
}

export default BackgroundMixin(ResizeSnapMixin(DropRowMixin(DragMixin(ResizeMixin(SectionRow)))));
