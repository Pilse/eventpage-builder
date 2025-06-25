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
} from "@/domain/builder";
import { v4 as uuidv4 } from "uuid";
import { ParentBlockType } from "@/type";

export class BlockFactory {
  static deserialize<T extends ReturnType<Block["serialize"]>>(serialized: T, parent: ParentBlockType) {
    switch (serialized.type) {
      case "FRAME_CANVAS":
        return new FrameBlock({ children: [], ...serialized, parent });
      case "FRAME_ROW":
        return new FrameRowBlock({
          children: [],
          gap: 0,
          alignHorizontal: "left",
          alignVertical: "top",
          ...serialized,
          parent,
        });
      case "FRAME_COL":
        return new FrameColBlock({
          children: [],
          gap: 0,
          alignHorizontal: "left",
          alignVertical: "top",
          ...serialized,
          parent,
        });
      case "TEXT":
        return new TextBlock({ ...serialized, parent });
      case "IMAGE":
        return new ImageBlock({ ...serialized, parent });
      case "SECTION_CANVAS":
        return new SectionBlock({ children: [], ...serialized, parent });
      case "SECTION_ROW":
        return new SectionRowBlock({
          children: [],
          gap: 0,
          alignHorizontal: "left",
          alignVertical: "top",
          ...serialized,
          parent,
        });
      case "SECTION_COL":
        return new SectionColBlock({
          children: [],
          gap: 0,
          alignHorizontal: "left",
          alignVertical: "top",
          ...serialized,
          parent,
        });
      case "CONTAINER":
        return new ContainerBlock({
          children: [],
          gap: 0,
          alignHorizontal: "center",
          alignVertical: "top",
          ...serialized,
          parent,
          device: "iPhone Pro Max",
        });
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
        return new FrameBlock({ children: [], ...serialized, parent, id: uuidv4() }, false);
      case "FRAME_ROW":
        return new FrameRowBlock(
          {
            children: [],
            gap: 0,
            alignHorizontal: "left",
            alignVertical: "top",
            ...serialized,
            parent,
            id: uuidv4(),
          },
          false
        );
      case "FRAME_COL":
        return new FrameColBlock(
          {
            children: [],
            gap: 0,
            alignHorizontal: "left",
            alignVertical: "top",
            ...serialized,
            parent,
            id: uuidv4(),
          },
          false
        );
      case "TEXT":
        return new TextBlock({ ...serialized, parent, id: uuidv4() });
      case "IMAGE":
        return new ImageBlock({ ...serialized, parent, id: uuidv4() });
      case "SECTION_CANVAS":
        return new SectionBlock({ children: [], ...serialized, parent, id: uuidv4() }, false);
      case "SECTION_ROW":
        return new SectionRowBlock(
          {
            children: [],
            gap: 0,
            alignHorizontal: "left",
            alignVertical: "top",
            ...serialized,
            parent,
            id: uuidv4(),
          },
          false
        );
      case "SECTION_COL":
        return new SectionColBlock(
          {
            children: [],
            gap: 0,
            alignHorizontal: "left",
            alignVertical: "top",
            ...serialized,
            parent,
            id: uuidv4(),
          },
          false
        );
      case "CONTAINER":
        return new ContainerBlock(
          {
            children: [],
            gap: 0,
            alignHorizontal: "center",
            alignVertical: "top",
            ...serialized,
            parent,
            id: uuidv4(),
            device: "iPhone Pro Max",
          },
          false
        );
      case "BLOCK":
        return new Block({ ...serialized, parent, id: uuidv4() });
    }
  }
}
