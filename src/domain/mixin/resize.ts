import { Block } from "@/domain/block";
import { Constructor } from "@/type";
import { hasChildrenMixin, isAutoLayouted } from "@/util";

export type ResizeMixinBlockType = InstanceType<ReturnType<typeof ResizeMixin<typeof Block>>>;

export const ResizeMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public resizable = true;
    public sizeMetric: SizeMetric | null = null;
    public resizableDir: ResizableDir;

    constructor(...args: any[]) {
      super(...args);
      this.resizableDir = new ResizableDir({});
    }

    public resetSizeMetric() {
      this.sizeMetric = null;
    }

    public setSizeMetric(domRect: DOMRect, scrollX: number, scrollY: number, pageX: number, pageY: number) {
      this.sizeMetric = new SizeMetric(
        domRect,
        scrollX,
        scrollY,
        this.t,
        this.r,
        this.b,
        this.l,
        pageX,
        pageY
      );
    }

    public resize(pos: { pageX: number; pageY: number }) {
      if (!this.sizeMetric) {
        return;
      }

      if (this.resizableDir.resizable("t")) {
        this.yDirection = "t";
        if (!isAutoLayouted(this)) {
          this.t = this.sizeMetric.getResizedTop(pos.pageY);
        }
        this.height = this.sizeMetric.getResizedHeight("t", pos.pageY);
        this.heightType = "fixed";
      }

      if (this.resizableDir.resizable("r")) {
        this.xDirection = "r";
        this.width = this.sizeMetric.getResizedWidth("r", pos.pageX);
        this.widthType = "fixed";
      }

      if (this.resizableDir.resizable("b")) {
        this.yDirection = "b";
        this.height = this.sizeMetric.getResizedHeight("b", pos.pageY);
        this.heightType = "fixed";
      }

      if (this.resizableDir.resizable("l")) {
        this.xDirection = "l";
        if (!isAutoLayouted(this)) {
          this.l = this.sizeMetric.getResizedLeft(pos.pageX);
        }
        this.width = this.sizeMetric.getResizedWidth("l", pos.pageX);
        this.widthType = "fixed";
      }
    }

    public isResizing() {
      return this.sizeMetric !== null;
    }

    public isSiblingResizing() {
      return this.parent && hasChildrenMixin(this.parent) && this.parent.isChildResizing();
    }
  };
};

export class SizeMetric {
  private domRect: DOMRect;
  private scrollX: number;
  private scrollY: number;
  private t: number;
  private r: number;
  private b: number;
  private l: number;
  private srcX: number;
  private srcY: number;

  constructor(
    domRect: DOMRect,
    scrollX: number,
    scrollY: number,
    t: number,
    r: number,
    b: number,
    l: number,
    srcX: number,
    srcY: number
  ) {
    this.domRect = domRect;
    this.scrollX = Math.floor(scrollX);
    this.scrollY = Math.floor(scrollY);
    this.t = t;
    this.r = r;
    this.b = b;
    this.l = l;
    this.srcX = srcX;
    this.srcY = srcY;
  }

  private getTopDelta(targetY: number) {
    return this.srcY - targetY;
  }

  private getBottomDelta(targetY: number) {
    return targetY - this.srcY;
  }

  private getLeftDelta(targetX: number) {
    return this.srcX - targetX;
  }

  private getRightDelta(targetX: number) {
    return targetX - this.srcX;
  }

  public getResizedLeft(targetX: number) {
    return Math.min(this.l + this.domRect.width + this.scrollX, this.l - this.getLeftDelta(targetX));
  }

  public getResizedTop(targetY: number) {
    return Math.min(this.t + this.domRect.height + this.scrollY, this.t - this.getTopDelta(targetY));
  }

  public getResizedHeight(dir: "t" | "b", targetY: number) {
    return this.domRect.height + (dir === "t" ? this.getTopDelta(targetY) : this.getBottomDelta(targetY));
  }

  public getResizedWidth(dir: "r" | "l", targetX: number) {
    return this.domRect.width + (dir === "r" ? this.getRightDelta(targetX) : this.getLeftDelta(targetX));
  }
}

export interface IResizableDir {
  t: boolean;
  b: boolean;
  l: boolean;
  r: boolean;
}

export class ResizableDir {
  private t: boolean;
  private b: boolean;
  private l: boolean;
  private r: boolean;

  constructor(resizableDir: Partial<IResizableDir>) {
    this.t = resizableDir?.t ?? false;
    this.b = resizableDir?.b ?? false;
    this.l = resizableDir?.l ?? false;
    this.r = resizableDir?.r ?? false;
  }

  public update(resizableDir: Partial<IResizableDir>) {
    this.t = resizableDir?.t ?? false;
    this.b = resizableDir?.b ?? false;
    this.l = resizableDir?.l ?? false;
    this.r = resizableDir?.r ?? false;
  }

  public resizable(...directions: ("t" | "b" | "l" | "r")[]) {
    return directions.some((direction) => this[direction] === true);
  }
}
