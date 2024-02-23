import { DragMixin, DropRowMixin, ResizeMixin } from "@/domain/mixin";
import { Block, BlockFactory, TextBlock } from "@/domain/block";

type ChildBlock = InstanceType<typeof TextBlock>;

export class FrameRow extends Block {
  public children: ChildBlock[] = [];

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
    }
  ) {
    super({ ...initState, type: "FRAME_ROW" });
    this.children = (initState.children.map((child) => BlockFactory.deserialize(child, this)) ??
      []) as ChildBlock[];
  }

  public serialize() {
    return {
      ...super.serialize(),
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "FRAME_ROW" as const,
    };
  }

  static deserialize(serialized: ReturnType<FrameRow["serialize"]>) {
    return new FrameRow(serialized);
  }
}

export default DropRowMixin(DragMixin(ResizeMixin(FrameRow)));
