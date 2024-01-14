import { v4 as uuidv4 } from "uuid";
import { hasChildrenMixin } from "@/util";
import { BlockType, ParentBlockType, Offset } from "@/type";

export interface IBlock {
  id?: string;
  type: BlockType;
  width?: number;
  height?: number;
  position?: "relative" | "absolute";
  parent?: ParentBlockType;
  t?: number;
  r?: number;
  b?: number;
  l?: number;
}

export class Block {
  public id: string;
  public type: BlockType;
  public width: number;
  public height: number;
  public position: "relative" | "absolute";
  public parent: ParentBlockType;
  public t: number;
  public r: number;
  public b: number;
  public l: number;
  public xDirection: "l" | "r";
  public yDirection: "t" | "b";
  private prevOffset: Offset;

  constructor(initState: IBlock) {
    this.id = initState.id ?? uuidv4();
    this.t = initState.t ?? 0;
    this.r = initState.r ?? 0;
    this.b = initState.b ?? 0;
    this.l = initState.l ?? 0;
    this.type = initState.type;
    this.position = initState.position ?? "absolute";
    this.parent = initState.parent ?? null;
    this.width = initState.width ?? 100;
    this.height = initState.height ?? 100;
    this.xDirection = "l";
    this.yDirection = "t";
    this.prevOffset = { x: 0, y: 0 };
  }

  public updateCoords(currentOffset: Offset, parentOffset?: Offset) {
    this.t = currentOffset.y - (parentOffset?.y ?? 0);
    this.l = currentOffset.x - (parentOffset?.x ?? 0);
    this.b = 0;
    this.r = 0;
  }

  public updateDirection(currentOffset: { x: number; y: number }) {
    this.xDirection =
      currentOffset.x === this.prevOffset.x
        ? this.xDirection
        : currentOffset.x - this.prevOffset.x > 0
        ? "r"
        : "l";
    this.yDirection =
      currentOffset.y === this.prevOffset.y
        ? this.yDirection
        : currentOffset.y - this.prevOffset.y > 0
        ? "b"
        : "t";
    this.prevOffset = currentOffset;
  }

  public serialize() {
    return {
      id: this.id,
      t: this.t,
      r: this.r,
      b: this.b,
      l: this.l,
      type: this.type,
      position: this.position,
      width: this.width,
      height: this.height,
    };
  }

  static deserialize(serialized: ReturnType<Block["serialize"]>) {
    return new Block(serialized);
  }

  static traverse(
    block: InstanceType<typeof Block>,
    handler: {
      beforeTraverse?: (block: InstanceType<typeof Block>) => void;
      afterTraverse?: (block: InstanceType<typeof Block>) => void;
    }
  ) {
    handler.beforeTraverse?.(block);

    if (hasChildrenMixin(block)) {
      block.children.forEach((child) => this.traverse(child, handler));
    }

    handler.afterTraverse?.(block);
  }

  public *[Symbol.iterator](): Generator<Block> {
    yield this;

    if (hasChildrenMixin(this)) {
      for (const child of this.children) {
        yield* child[Symbol.iterator]();
      }
    }
  }
}
