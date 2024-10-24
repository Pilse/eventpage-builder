import { DragMixin, ResizeMixin } from "@/domain/mixin";
import { Block } from "@/domain/block";

export class Text extends Block {
  private content: string;

  constructor(initState: Omit<ConstructorParameters<typeof Block>[0], "type"> & { content?: string }) {
    super({ ...initState, type: "TEXT" });
    this.content = initState?.content ?? "";
  }

  public getContent() {
    return this.content;
  }

  public setContent(content: string) {
    this.content = content;
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

export default ResizeMixin(DragMixin(Text));
