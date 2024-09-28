import { BlockType } from "@/type";
import { Block } from "../block";

export class GlobalContext {
  private static instance: GlobalContext;
  private currentBlock: InstanceType<typeof Block> | null = null;
  private newBlockType: BlockType | null = null;

  static getInstance() {
    if (!GlobalContext.instance) {
      GlobalContext.instance = new GlobalContext();
    }
    return GlobalContext.instance;
  }

  constructor() {}

  setCurrentBlock(block: InstanceType<typeof Block> | null) {
    this.currentBlock = block;
  }

  getCurrentBlock() {
    return this.currentBlock;
  }

  setNewBlockType(blockType: BlockType) {
    this.newBlockType = blockType;
  }

  getNewBlockType() {
    return this.newBlockType;
  }
}
