import { Block, BlockFactory, FrameBlock, TextBlock } from "@/domain/block";
import { ChildrenMixin, DropMixin, ResizeMixin, SnapMixin } from "@/domain/mixin";
import { LayoutMap } from "@/type";

type ChildBlock = InstanceType<typeof TextBlock> | InstanceType<typeof FrameBlock>;

export class Section extends Block {
  public children: ChildBlock[];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children?: ReturnType<ChildBlock["serialize"]>[];
    }
  ) {
    super({ ...initState, type: "SECTION", position: "relative" });
    this.children = (initState.children?.map((child) => BlockFactory.deserialize(child, this)) ??
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

export default DropMixin(ResizeMixin(Section));
