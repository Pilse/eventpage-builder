import { throttle } from "@/shared/util/utils";
import { BlockFactory, Container, ContainerBlock } from "./block";
import { v4 as uuidv4 } from "uuid";

type Snapshot = ReturnType<InstanceType<typeof ContainerBlock>["serialize"]>;

export class BlockHistory {
  private undoq: Snapshot[] = [];
  private redoq: Snapshot[] = [];
  private snapshotMap = new Map<string, Snapshot>();
  private root: InstanceType<typeof Container>;
  private throttleUpdateBlock: ReturnType<typeof throttle>;
  public historyId: string = "initial";

  constructor(
    root: InstanceType<typeof Container>,
    callbacks: {
      endCaptureCallback: (root: InstanceType<typeof Container>) => void;
    }
  ) {
    this.root = root;
    this.throttleUpdateBlock = throttle(callbacks.endCaptureCallback, 1000);
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
    this.throttleUpdateBlock(this.root);
  }

  public undo() {
    const snapshot = this.undoq.pop();
    if (!snapshot) {
      return;
    }

    this.redoq = this.redoq.concat(this.root.serialize());
    this.root = BlockFactory.deserialize(snapshot, null) as Container;
    this.historyId = uuidv4();
  }

  public redo() {
    const snapshot = this.redoq.pop();
    if (!snapshot) {
      return;
    }

    this.undoq = this.undoq.concat(this.root.serialize());
    this.root = BlockFactory.deserialize(snapshot, null) as Container;
    this.historyId = uuidv4();
  }
}
