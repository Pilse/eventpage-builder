import { Block, BlockFactory, SectionBlock, SectionColBlock, SectionRowBlock } from "@/domain/builder";
import { BackgroundMixin, DeviceMixin, DropColMixin, ResizeMixin } from "../mixin";
import { LayoutMap } from "@/type";

type ChildBlock =
  | InstanceType<typeof SectionBlock>
  | InstanceType<typeof SectionRowBlock>
  | InstanceType<typeof SectionColBlock>;

export class Container extends Block {
  public children: ChildBlock[];
  public gap: number = 0;
  public alignHorizontal: "left" | "center" | "right" = "left";
  public alignVertical: "top" | "center" | "bottom" = "top";
  public device: string | null;

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type" | "position"> & {
      children: ReturnType<ChildBlock["serialize"]>[];
      gap: number;
      alignHorizontal: "left" | "center" | "right";
      alignVertical: "top" | "center" | "bottom";
      device?: string | null;
    },
    deserialize = true
  ) {
    super({ ...initState, type: "CONTAINER", position: "relative" });
    this.gap = initState.gap;
    this.alignHorizontal = initState.alignHorizontal;
    this.alignVertical = initState.alignVertical;
    this.device = initState.device ?? "iPhone Pro Max";
    this.children = (initState.children.map((child) =>
      deserialize ? BlockFactory.deserialize(child, this) : BlockFactory.create(child, this)
    ) ?? []) as ChildBlock[];
  }

  get width() {
    return this._width;
  }

  set width(value: number) {
    super.width = value;
    this.device = null;
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
      gap: this.gap,
      alignHorizontal: this.alignHorizontal,
      alignVertical: this.alignVertical,
      device: this.device,
      children: this.children.map((child) => child.serialize()) as ReturnType<ChildBlock["serialize"]>[],
      type: "CONTAINER" as const,
    };
  }

  static deserialize(serialized: ReturnType<Container["serialize"]>) {
    return new Container(serialized);
  }
}

export default DeviceMixin(BackgroundMixin(ResizeMixin(DropColMixin(Container))));
