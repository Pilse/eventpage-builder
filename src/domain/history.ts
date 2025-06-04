import { Block, BlockFactory } from "./block";
import { v4 as uuidv4 } from "uuid";

type Snapshot = ReturnType<InstanceType<typeof Block>["serialize"]>;

export class BlockHistory {
  private undoq: Snapshot[] = [];
  private redoq: Snapshot[] = [];
  private snapshotMap = new Map<string, Snapshot>();
  private root: InstanceType<typeof Block>;
  public historyId: string = "initial";

  constructor(root: InstanceType<typeof Block>) {
    this.root = root;
  }

  public getRoot() {
    return this.root;
  }

  public startCaptureSnapshot(
    id: string,
    options: { ignoreDuplicate?: boolean } = { ignoreDuplicate: true }
  ) {
    if (options.ignoreDuplicate && this.snapshotMap.has(id)) {
      return;
    }
    this.snapshotMap.set(id, this.root.serialize());
  }

  public endCaptureSnapshot(id: string) {
    const snapshot = this.snapshotMap.get(id);
    if (!snapshot) {
      return;
    }

    this.undoq = this.undoq.concat(snapshot);
    this.snapshotMap.delete(id);
  }

  public undo() {
    const snapshot = this.undoq.pop();
    if (!snapshot) {
      return;
    }

    this.redoq = this.redoq.concat(this.root.serialize());
    this.root = BlockFactory.deserialize(snapshot, null);
    this.historyId = uuidv4();
  }

  public redo() {
    const snapshot = this.redoq.pop();
    if (!snapshot) {
      return;
    }

    this.undoq = this.undoq.concat(this.root.serialize());
    this.root = BlockFactory.deserialize(snapshot, null);
    this.historyId = uuidv4();
  }
}
