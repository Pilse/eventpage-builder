import { BackgroundMixin, BorderMixin, DragMixin, ResizeMixin, ShadowMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Image extends Block {
  public url: string;
  public filename: string;
  public source: "URL" | "FILE" = "URL";
  public aspectRatio: number = 0;

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & {
      url?: string;
      filename?: string;
      source?: Image["source"];
      aspectRatio?: number;
    }
  ) {
    super({ ...initState, type: "IMAGE" });
    this.source = initState?.source ?? "URL";
    this.url = initState?.url ?? "";
    this.filename = initState?.filename ?? "";
    this.aspectRatio = initState?.aspectRatio ?? 0;
  }

  get height() {
    return super.height;
  }

  set height(value: number) {
    super.height = value;
  }

  get width() {
    return super.width;
  }

  set width(value: number) {
    super.width = value;
    if (this.heightType === "fit") {
      this.setAspectRatioHeight();
    }
  }

  public setAspectRatioHeight() {
    this.height = Math.floor((this.width / this.aspectRatio) * 100);
  }

  public serialize() {
    return {
      ...super.serialize(),
      source: this.source,
      url: this.url,
      filename: this.filename,
      aspectRatio: this.aspectRatio,
      type: "IMAGE" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Image["serialize"]>) {
    return new Image(serialized);
  }
}

export default BackgroundMixin(ShadowMixin(BorderMixin(ResizeMixin(DragMixin(Image)))));
