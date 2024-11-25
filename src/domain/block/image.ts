import { DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Image extends Block {
  public url: string;
  public source: "URL" | "FILE" = "URL";
  public aspectRatio: number = 0;

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & {
      url?: string;
      source?: Image["source"];
      aspectRatio?: number;
    }
  ) {
    super({ ...initState, type: "IMAGE" });
    this.source = initState?.source ?? "URL";
    this.url = initState?.url ?? "";
    this.aspectRatio = initState?.aspectRatio ?? 0;
  }

  get height() {
    if (this.heightType === "fit") {
      const height = Math.floor((this.width / this.aspectRatio) * 100);
      this._height = height;
      return height;
    }

    return super.height;
  }

  set height(value: number) {
    super.height = value;
  }

  public serialize() {
    return {
      ...super.serialize(),
      source: this.source,
      url: this.url,
      aspectRatio: this.aspectRatio,
      type: "IMAGE" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Image["serialize"]>) {
    return new Image(serialized);
  }
}

export default ResizeMixin(DragMixin(Image));
