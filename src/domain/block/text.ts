import { BackgroundMixin, BorderMixin, DragMixin, ResizeMixin, TypographyMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";
import { ShadowMixin } from "../mixin/shadow";

export class Text extends Block {
  public content: string;
  public _content: string;
  public fontName: string;
  public fontWeight: number;

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & {
      content?: string;
      fontName?: string;
      fontWeight?: number;
    }
  ) {
    super({ ...initState, type: "TEXT" });
    this.content = initState?.content ?? "";
    this._content = initState?.content ?? "";
    this.fontName = initState?.fontName ?? "Pretendard-400";
    this.fontWeight = initState?.fontWeight ?? 400;
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
      fontName: this.fontName,
      fontWeight: this.fontWeight,
      type: "TEXT" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Text["serialize"]>) {
    return new Text(serialized);
  }
}

export default TypographyMixin(ShadowMixin(BorderMixin(BackgroundMixin(ResizeMixin(DragMixin(Text))))));
