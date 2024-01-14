import { Block, FrameBlock, SectionBlock, TextBlock } from "@/domain/block";
import { v4 as uuidv4 } from "uuid";
import { ParentBlockType } from "@/type";

export class BlockFactory {
  static deserialize<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME":
        return new FrameBlock({ ...serialized, parent });
      case "TEXT":
        return new TextBlock({ ...serialized, parent });
      case "SECTION":
        return new SectionBlock({ ...serialized, parent });
      case "BLOCK":
        return new Block({ ...serialized, parent });
    }
  }

  static create<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME":
        return new FrameBlock({ ...serialized, parent, id: uuidv4() });
      case "TEXT":
        return new TextBlock({ ...serialized, parent, id: uuidv4() });
      case "SECTION":
        return new SectionBlock({ ...serialized, parent, id: uuidv4() });
      case "BLOCK":
        return new Block({ ...serialized, parent, id: uuidv4() });
    }
  }
}
