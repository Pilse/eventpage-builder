import { v4 as uuidv4 } from "uuid";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { BlockType, ParentBlockType, Offset } from "@/type";
import { ChildrenMixinBlockType } from "../mixin";

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
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  widthType?: "fixed" | "fill" | "fit";
  heightType?: "fixed" | "fill" | "fit";
}

export class Block {
  public id: string;
  public type: BlockType;
  public widthType: "fixed" | "fill" | "fit";
  public heightType: "fixed" | "fill" | "fit";
  public position: "relative" | "absolute";
  public parent: ParentBlockType;
  public t: number;
  public r: number;
  public b: number;
  public l: number;
  public pt: number;
  public pr: number;
  public pb: number;
  public pl: number;
  public xDirection: "l" | "r";
  public yDirection: "t" | "b";
  public _width: number;
  public _height: number;
  private prevOffset: Offset;

  constructor(initState: IBlock) {
    this.id = initState.id ?? uuidv4();
    this.t = (initState.t ?? 0) + (initState.parent?.pt ?? 0);
    this.r = (initState.r ?? 0) + (initState.parent?.pr ?? 0);
    this.b = (initState.b ?? 0) + (initState.parent?.pb ?? 0);
    this.l = (initState.l ?? 0) + (initState.parent?.pl ?? 0);
    this.pt = initState.pt ?? 0;
    this.pr = initState.pr ?? 0;
    this.pb = initState.pb ?? 0;
    this.pl = initState.pl ?? 0;
    this.type = initState.type;
    this.position = initState.position ?? "absolute";
    this.parent = initState.parent ?? null;
    this._width = initState.width ?? 100;
    this._height = initState.height ?? 100;
    this.xDirection = "l";
    this.yDirection = "t";
    this.prevOffset = { x: 0, y: 0 };
    this.widthType = initState.widthType ?? "fixed";
    this.heightType = initState.heightType ?? "fixed";
  }

  get width() {
    switch (this.widthType) {
      case "fixed":
        return this._width;
      case "fill": {
        if (!this.parent || !this.parent.children) {
          return this._width;
        }

        const fillChildrenCnt = this.parent.children.filter((child) => child.widthType === "fill").length;
        const fixedChildrenWidth = this.parent.children.reduce((acc, child) => {
          return acc + (child.widthType === "fixed" ? child.width : 0);
        }, 0);
        const gapTotal = hasDropRowMixin(this.parent)
          ? (this.parent.children.length > 1 ? this.parent.children.length - 1 : 0) * this.parent.gap
          : 0;
        const parentWidth = this.parent.width - this.parent.pl - this.parent.pr;
        const width = hasDropRowMixin(this.parent)
          ? Math.floor((parentWidth - gapTotal - fixedChildrenWidth) / fillChildrenCnt)
          : parentWidth;
        this._width = width;
        return width;
      }
      case "fit": {
        if (!hasChildrenMixin(this) || this.children.length === 0) {
          return this._width;
        }

        if (!hasDropRowMixin(this) && !hasDropColMixin(this)) {
          return this._width;
        }

        const gapTotal = hasDropRowMixin(this)
          ? (this.children.length > 1 ? this.children.length - 1 : 0) * this.gap
          : 0;
        const paddingTotal = this.pl + this.pr;
        const childrenWidth = hasDropRowMixin(this)
          ? this.children.reduce((acc, child) => {
              return acc + (child.widthType === "fill" ? this._width : child.width);
            }, 0)
          : Math.max(
              ...this.children.map((child) =>
                child.widthType === "fill" ? this._width - paddingTotal : child.width
              )
            );

        const width = childrenWidth + gapTotal + paddingTotal;
        this._width = width;
        return width;
      }
    }
  }

  set width(value: number) {
    this._width = value;
  }

  get height() {
    switch (this.heightType) {
      case "fixed":
        return this._height;
      case "fill": {
        if (!this.parent || !this.parent.children) {
          return this._height;
        }

        const fillChildrenCnt = this.parent.children.filter((child) => child.heightType === "fill").length;
        const fixedChildrenHeight = this.parent.children.reduce((acc, child) => {
          return acc + (child.heightType === "fixed" ? child.height : 0);
        }, 0);
        const gapTotal = hasDropColMixin(this.parent)
          ? (this.parent.children.length > 1 ? this.parent.children.length - 1 : 0) * this.parent.gap
          : 0;
        const parentHeight = this.parent.height - this.parent.pt - this.parent.pb;
        const height = hasDropRowMixin(this.parent)
          ? parentHeight
          : Math.floor((parentHeight - gapTotal - fixedChildrenHeight) / fillChildrenCnt);
        this._height = height;
        return height;
      }
      case "fit": {
        if (!hasChildrenMixin(this) || this.children.length === 0) {
          return this._height;
        }

        if (!hasDropRowMixin(this) && !hasDropColMixin(this)) {
          return this._height;
        }

        const gapTotal = hasDropColMixin(this)
          ? (this.children.length > 1 ? this.children.length - 1 : 0) * this.gap
          : 0;
        const paddingTotal = this.pt + this.pb;
        const childrenHeight = hasDropColMixin(this)
          ? this.children.reduce((acc, child) => {
              return acc + (child.heightType === "fill" ? this._height : child.height);
            }, 0)
          : Math.max(
              ...this.children.map((child) =>
                child.heightType === "fill" ? this._height - paddingTotal : child.height
              )
            );

        const height = childrenHeight + gapTotal + paddingTotal;
        this._height = height;
        return height;
      }
    }
  }

  set height(value: number) {
    this._height = value;
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

  public getClosestParent(): ChildrenMixinBlockType | null {
    let parent: Block | null = this;
    if (hasChildrenMixin(parent)) {
      return parent;
    }

    while (parent && !hasChildrenMixin(parent)) {
      parent = parent.parent;
    }

    return parent;
  }

  public serialize(): {
    id: string;
    t: number;
    r: number;
    b: number;
    l: number;
    pt: number;
    pr: number;
    pb: number;
    pl: number;
    type: BlockType;
    position: "relative" | "absolute";
    width: number;
    height: number;
    widthType: "fixed" | "fill" | "fit";
    heightType: "fixed" | "fill" | "fit";
  } {
    return {
      id: this.id,
      t: this.t,
      r: this.r,
      b: this.b,
      l: this.l,
      pt: this.pt,
      pr: this.pr,
      pb: this.pb,
      pl: this.pl,
      type: this.type,
      position: this.position,
      width: this.width,
      height: this.height,
      widthType: this.widthType,
      heightType: this.heightType,
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
