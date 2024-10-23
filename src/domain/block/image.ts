import { DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Image extends Block {
  private url: string;

  constructor(initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & { url?: string }) {
    super({ ...initState, type: "IMAGE" });
    this.url = initState?.url ?? "";
  }

  public getUrl() {
    return this.url;
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public serialize() {
    return {
      ...super.serialize(),
      url: this.url,
      type: "IMAGE" as const,
    };
  }

  public static deserialize(serialized: ReturnType<Image["serialize"]>) {
    return new Image(serialized);
  }
}

export default ResizeMixin(DragMixin(Image));
