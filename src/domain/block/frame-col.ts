import { DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block, BlockFactory, TextBlock } from "@/domain/block";
import { DropColMixin } from "../mixin/drop-col";

type ChildBlock = InstanceType<typeof TextBlock>;

export class FrameCol extends Block {
  public children: ChildBlock[] = [];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
    }
  ) {
    super({ ...initState, type: "FRAME_COL" });
    this.children = (initState.children.map((child) => BlockFactory.deserialize(child, this)) ??
      []) as ChildBlock[];
  }

  public serialize() {
    return {
      ...super.serialize(),
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "FRAME_COL" as const,
    };
  }

  static deserialize(serialized: ReturnType<FrameCol["serialize"]>) {
    return new FrameCol(serialized);
  }
}

export default DropColMixin(DragMixin(ResizeMixin(FrameCol)));
