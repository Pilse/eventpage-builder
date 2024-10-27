import {
  Block,
  ContainerBlock,
  FrameBlock,
  FrameColBlock,
  FrameRowBlock,
  ImageBlock,
  SectionBlock,
  SectionColBlock,
  SectionRowBlock,
  TextBlock,
} from "@/domain/block";
import { v4 as uuidv4 } from "uuid";
import { ParentBlockType } from "@/type";

export class BlockFactory {
  static deserialize<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME_CANVAS":
        return new FrameBlock({ children: [], ...serialized, parent });
      case "FRAME_ROW":
        return new FrameRowBlock({ children: [], ...serialized, parent });
      case "FRAME_COL":
        return new FrameColBlock({ children: [], ...serialized, parent });
      case "TEXT":
        return new TextBlock({ ...serialized, parent });
      case "IMAGE":
        return new ImageBlock({ ...serialized, parent });
      case "SECTION_CANVAS":
        return new SectionBlock({ children: [], ...serialized, parent });
      case "SECTION_ROW":
        return new SectionRowBlock({ children: [], ...serialized, parent });
      case "SECTION_COL":
        return new SectionColBlock({ children: [], ...serialized, parent });
      case "CONTAINER":
        return new ContainerBlock({ children: [], ...serialized, parent });
      case "BLOCK":
        return new Block({ ...serialized, parent });
    }
  }

  static create<T extends Omit<ReturnType<Block["serialize"]>, "id">>(
    serialized: T,
    parent: ParentBlockType
  ) {
    switch (serialized.type) {
      case "FRAME_CANVAS":
        return new FrameBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "FRAME_ROW":
        return new FrameRowBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "FRAME_COL":
        return new FrameColBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "TEXT":
        return new TextBlock({ ...serialized, parent, id: uuidv4() });
      case "IMAGE":
        return new ImageBlock({ ...serialized, parent, id: uuidv4() });
      case "SECTION_CANVAS":
        return new SectionBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "SECTION_ROW":
        return new SectionRowBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "SECTION_COL":
        return new SectionColBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "CONTAINER":
        return new ContainerBlock({ children: [], ...serialized, parent, id: uuidv4() });
      case "BLOCK":
        return new Block({ ...serialized, parent, id: uuidv4() });
    }
  }
}
