import { Block, FrameBlock, FrameColBlock, FrameRowBlock, SectionBlock, TextBlock } from "@/domain/block";
import { v4 as uuidv4 } from "uuid";
import { ParentBlockType } from "@/type";

export class BlockFactory {
  static deserialize<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME":
        return new FrameBlock({ children: [], ...serialized, parent });
      case "FRAME_ROW":
        return new FrameRowBlock({ children: [], ...serialized, parent });
      case "FRAME_COL":
        return new FrameColBlock({ children: [], ...serialized, parent });
      case "TEXT":
        return new TextBlock({ ...serialized, parent });
      case "SECTION":
        return new SectionBlock({ children: [], ...serialized, parent });
      case "BLOCK":
        return new Block({ ...serialized, parent });
    }
  }

  static create<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME":
        return new FrameBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "FRAME_ROW":
        return new FrameRowBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "FRAME_COL":
        return new FrameColBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "TEXT":
        return new TextBlock({ ...serialized, parent, id: uuidv4() });
      case "SECTION":
        return new SectionBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "BLOCK":
        return new Block({ ...serialized, parent, id: uuidv4() });
    }
  }
}
