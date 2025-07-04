import { Block } from "@/domain/builder";
import { Constructor } from "@/type";
import { hasChildrenMixin, hasResizeMixin } from "@/shared/util";

export type ChildrenMixinBlockType = InstanceType<
  ReturnType<typeof ChildrenMixin<Constructor<Block & { children: Block[] }>>>
>;

export const ChildrenMixin = <TBase extends Constructor<Block & { children: InstanceType<typeof Block>[] }>>(
  Base: TBase
) => {
  return class extends Base {
    public placeable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    public isChildResizing(): boolean {
      return this.children.some((child) => {
        if (hasResizeMixin(child) && child.isResizing()) {
          return true;
        }

        if (hasChildrenMixin(child)) {
          return child.isChildResizing();
        }

        return false;
      });
    }

    public hasChlidDeep(child: InstanceType<typeof Block>) {
      for (const block of this) {
        if (block.id === this.id) {
          continue;
        }

        if (block.id === child.id) {
          return true;
        }
      }
      return false;
    }

    public addChild(child: InstanceType<typeof Block>) {
      this.children = this.children.concat(child);
    }

    public addChildBefore(child: InstanceType<typeof Block>, before: InstanceType<typeof Block>) {
      const beforeIdx = this.children.findIndex((child) => child.id === before.id);

      if (beforeIdx === -1) {
        return this.addChild(child);
      }

      this.children = this.children.slice(0, beforeIdx).concat(child).concat(this.children.slice(beforeIdx));
    }

    public addChildAfter(child: InstanceType<typeof Block>, after: InstanceType<typeof Block>) {
      const afterIdx = this.children.findIndex((child) => child.id === after.id);
      if (afterIdx === -1) {
        return this.addChild(child);
      }

      this.children = this.children
        .slice(0, afterIdx + 1)
        .concat(child)
        .concat(this.children.slice(afterIdx + 1));
    }

    public removeChild(child: InstanceType<typeof Block>) {
      this.children = this.children.filter((c) => c.id !== child.id);
    }

    public replaceChild(block: InstanceType<typeof Block>) {
      this.children = this.children.map((child) => (child.id === block.id ? block : child));
    }

    public findChild(block: InstanceType<typeof Block>) {
      return this.children.find((child) => child.id === block.id);
    }

    public findChildById(id: string) {
      return this.children.find((child) => child.id === id);
    }

    public findChildIdx(block: InstanceType<typeof Block>) {
      return this.children.findIndex((child) => child.id === block.id);
    }

    public swapChildren(child1: InstanceType<typeof Block>, child2: InstanceType<typeof Block>) {
      const child1Idx = this.children.findIndex((child) => child.id === child1.id);
      const child2Idx = this.children.findIndex((child) => child.id === child2.id);
      if (child1Idx === -1 || child2Idx === -1 || child1Idx === child2Idx) {
        return;
      }

      this.children = this.children.map((child, idx) =>
        idx === child1Idx ? this.children[child2Idx] : idx === child2Idx ? this.children[child1Idx] : child
      );
    }

    public sortChildren(sort: "t" | "l" = "t") {
      this.children = this.children.sort((a, b) => {
        if (sort === "t") {
          return a.t - b.t;
        } else {
          return a.l - b.l;
        }
      });
    }
  };
};
