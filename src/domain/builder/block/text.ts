import {
  BackgroundMixin,
  BorderMixin,
  DragMixin,
  ResizeMixin,
  TypographyMixin,
} from "@/domain/builder/mixin";
import { Block } from "@/domain/builder";
import { ShadowMixin } from "../mixin/shadow";
import { Color, TextAlign, TextShadow } from "@/type";

export class Text extends Block {
  public content: string;
  public _content: string;
  public fontName: string;
  public fontWeight: number;
  public fontColor: Color;
  public fontSize: number;
  public letterSpacing: number;
  public lineHeight: number;
  public textAlign: TextAlign;
  public textShadow: TextShadow;

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & {
      content?: string;
      fontName?: string;
      fontWeight?: number;
      fontColor?: Color;
      fontSize?: number;
      letterSpacing?: number;
      lineHeight?: number;
      textAlign?: TextAlign;
      textShadow?: TextShadow;
    }
  ) {
    super({ ...initState, type: "TEXT" });
    this.content = initState?.content ?? "";
    this._content = initState?.content ?? "";
    this.fontName = initState?.fontName ?? "Pretendard";
    this.fontWeight = initState?.fontWeight ?? 400;
    this.fontColor = initState?.fontColor ?? { r: 0, g: 0, b: 0, a: 1 };
    this.fontSize = initState?.fontSize ?? 16;
    this.lineHeight = initState?.lineHeight ?? 1;
    this.letterSpacing = initState?.letterSpacing ?? 0;
    this.textAlign = initState?.textAlign ?? "left";
    this.textShadow = initState?.textShadow ?? { x: 0, y: 0, blur: 0, color: { r: 0, g: 0, b: 0, a: 0 } };
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
      fontColor: this.fontColor,
      fontSize: this.fontSize,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      textAlign: this.textAlign,
      textShadow: this.textShadow,
      type: "TEXT" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Text["serialize"]>) {
    return new Text(serialized);
  }
}

export default TypographyMixin(ShadowMixin(BorderMixin(BackgroundMixin(ResizeMixin(DragMixin(Text))))));
