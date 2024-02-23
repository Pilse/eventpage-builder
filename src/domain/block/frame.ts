import { DragMixin, DropMixin, ResizeMixin } from "@/domain/mixin";
import { Block, BlockFactory, TextBlock } from "@/domain/block";
import { LayoutMap, Position } from "@/type";

type ChildBlock = InstanceType<typeof TextBlock>;

export class Frame extends Block {
  public children: ChildBlock[];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
    }
  ) {
    super({ ...initState, type: "FRAME" });
    this.children = (initState.children.map((child) => BlockFactory.deserialize(child, this)) ??
      []) as ChildBlock[];
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
    } while (parent);

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
      t: sectionOffset.t,
      r: sectionOffset.r,
      b: sectionOffset.b,
      l: sectionOffset.l,
      width: this.width,
      height: this.height,
    };

    return layoutMap;
  }

  public serialize() {
    return {
      ...super.serialize(),
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "FRAME" as const,
    };
  }

  static deserialize(serialized: ReturnType<Frame["serialize"]>) {
    return new Frame(serialized);
  }
}

export default DragMixin(DropMixin(ResizeMixin(Frame)));
