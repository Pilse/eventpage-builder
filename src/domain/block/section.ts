import { Block, BlockFactory, FrameBlock, FrameColBlock, FrameRowBlock, TextBlock } from "@/domain/block";
import { DropCanvasMixin, ResizeMixin, ResizeSnapMixin } from "@/domain/mixin";
import { LayoutMap } from "@/type";

type ChildBlock =
  | InstanceType<typeof TextBlock>
  | InstanceType<typeof FrameBlock>
  | InstanceType<typeof FrameRowBlock>
  | InstanceType<typeof FrameColBlock>;

export class Section extends Block {
  public children: ChildBlock[];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
    }
  ) {
    super({ ...initState, type: "SECTION", width: initState.parent?.width ?? initState.width });
    this.children = (initState.children.map((child) => BlockFactory.deserialize(child, this)) ??
      []) as ChildBlock[];
  }

  public getLayoutMap() {
    const layoutMap: LayoutMap = {};
    for (const child of this.children) {
      layoutMap[child.id] = {
        t: child.t + this.t,
        r: child.r + this.r,
        b: child.b + this.b,
        l: child.l + this.l,
        width: child.width,
        height: child.height,
      };
    }
    layoutMap[this.id] = {
      t: this.t,
      r: this.r,
      b: this.b,
      l: this.l,
      width: this.width,
      height: this.height,
    };

    layoutMap["centerX"] = {
      t: this.t + Math.floor(this.height / 2),
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
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "SECTION" as const,
    };
  }

  static deserialize(serialized: ReturnType<Section["serialize"]>) {
    return new Section(serialized);
  }
}

export default ResizeSnapMixin(DropCanvasMixin(ResizeMixin(Section)));
