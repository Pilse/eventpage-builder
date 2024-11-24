import { DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Image extends Block {
  public url: string;
  public source: "URL" | "FILE" = "URL";

  constructor(
    initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & {
      url?: string;
      source?: Image["source"];
    }
  ) {
    super({ ...initState, type: "IMAGE" });
    this.source = initState?.source ?? "URL";
    this.url = initState?.url ?? "";
  }

  public serialize() {
    return {
      ...super.serialize(),
      source: this.source,
      url: this.url,
      type: "IMAGE" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Image["serialize"]>) {
    return new Image(serialized);
  }
}

export default ResizeMixin(DragMixin(Image));
