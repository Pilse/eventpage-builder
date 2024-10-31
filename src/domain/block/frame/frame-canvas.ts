import { DragMixin, DropCanvasMixin, ResizeMixin, ResizeSnapMixin } from "@/domain/mixin";
import { Block, BlockFactory, ImageBlock, TextBlock } from "@/domain/block";
import { LayoutMap, Position } from "@/type";
import { v4 as uuidv4 } from "uuid";

type ChildBlock = InstanceType<typeof TextBlock> | InstanceType<typeof ImageBlock>;

export class FrameCanvas extends Block {
  public children: ChildBlock[];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
    },
    deserialize = true
  ) {
    super({ ...initState, type: "FRAME_CANVAS" });
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
      t: sectionOffset.t,
      r: sectionOffset.r,
      b: sectionOffset.b,
      l: sectionOffset.l,
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
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "FRAME_CANVAS" as const,
    };
  }

  static deserialize(serialized: ReturnType<FrameCanvas["serialize"]>) {
    return new FrameCanvas(serialized);
  }
}

export default ResizeSnapMixin(DragMixin(DropCanvasMixin(ResizeMixin(FrameCanvas))));
