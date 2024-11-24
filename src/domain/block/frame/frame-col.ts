import { DragMixin, DropColMixin, ResizeMixin, ResizeSnapMixin } from "@/domain/mixin";
import { Block, BlockFactory, FrameBlock, FrameRowBlock, ImageBlock, TextBlock } from "@/domain/block";
import { LayoutMap, Position } from "@/type";

type ChildBlock = InstanceType<typeof TextBlock> | InstanceType<typeof ImageBlock>;

export class FrameCol extends Block {
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
    super({ ...initState, type: "FRAME_COL" });
    this.gap = initState.gap;
    this.alignVertical = initState.alignVertical;
    this.alignHorizontal = initState.alignHorizontal;
    this.children = (initState.children.map((child) =>
      deserialize ? BlockFactory.deserialize(child, this) : BlockFactory.create(child, this)
    ) ?? []) as ChildBlock[];
  }

  public getLayoutMap() {
    const layoutMap: LayoutMap = {};
    const sectionOffset: Position = { t: 0, l: 0, r: 0, b: 0 };
    let parent: InstanceType<typeof Block> | null = this;
    do {
      sectionOffset.t += parent.t;
      sectionOffset.l += parent.l;
      sectionOffset.b += parent.b;
      sectionOffset.r += parent.r;
      parent = parent.parent;
    } while (parent && !parent.type.startsWith("SECTION"));

    for (const child of this.children) {
      layoutMap[child.id] = {
        t: child.t + sectionOffset.t,
        r: child.r + sectionOffset.r,
        b: child.b + sectionOffset.b,
        l: child.l + sectionOffset.l,
        width: child.width,
        height: child.height,
      };
    }

    layoutMap[this.id] = {
      t: sectionOffset.t - this.pt,
      r: sectionOffset.r - this.pr,
      b: sectionOffset.b - this.pb,
      l: sectionOffset.l - this.pl,
      width: this.width,
      height: this.height,
    };

    layoutMap["centerX"] = {
      t: sectionOffset.t + Math.floor(this.height / 2),
      r: sectionOffset.r,
      b: sectionOffset.b,
      l: sectionOffset.l,
      width: this.width,
      height: 0,
    };

    layoutMap["centerY"] = {
      t: sectionOffset.t,
      r: sectionOffset.r,
      b: sectionOffset.b,
      l: sectionOffset.l + Math.floor(this.width / 2),
      width: 0,
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
      type: "FRAME_COL" as const,
    };
  }

  static deserialize(serialized: ReturnType<FrameCol["serialize"]>) {
    return new FrameCol(serialized);
  }
}

export default ResizeSnapMixin(DropColMixin(DragMixin(ResizeMixin(FrameCol))));
