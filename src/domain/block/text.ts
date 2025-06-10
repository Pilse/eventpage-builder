import { BackgroundMixin, DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Text extends Block {
  public content: string;
  public _content: string;

  constructor(initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & { content?: string }) {
    super({ ...initState, type: "TEXT" });
    this.content = initState?.content ?? "";
    this._content = initState?.content ?? "";
  }

  get width() {
    if (this.widthType === "fit") {
      return this._width;
    }

    return super.width;
  }

  set width(value: number) {
    super.width = value;
  }

  get height() {
    if (this.heightType === "fit") {
      return this._height;
    }

    return super.height;
  }

  set height(value: number) {
    super.height = value;
  }

  public serialize() {
    return {
      ...super.serialize(),
      content: this.content,
      type: "TEXT" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Text["serialize"]>) {
    return new Text(serialized);
  }
}

export default BackgroundMixin(ResizeMixin(DragMixin(Text)));
