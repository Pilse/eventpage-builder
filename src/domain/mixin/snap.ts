import { Block } from "@/domain/block";
import { hasSnapMixin } from "@/util";
import { Constructor, LayoutMap, Offset } from "@/type";

export type SnapMixinBlockType = InstanceType<
  ReturnType<
    typeof SnapMixin<
      Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
    >
  >
>;

export const SnapMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends Base {
    public snappable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    private removeSelectedBlockLayouts(layoutMap: LayoutMap, block: InstanceType<typeof Block>) {
      const copiedlayoutMap = { ...layoutMap };
      Block.traverse(block, {
        beforeTraverse: (block) => {
          delete copiedlayoutMap[block.id];
        },
      });
      return copiedlayoutMap;
    }

    private getSnappedRX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetRX = currentOffsetFromSection.x + block.width;
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const rx =
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetRX - pos.l) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l;
          }

          if (Math.abs(offsetRX - (pos.l + pos.width)) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l + pos.width;
          }

          if (Math.abs(offsetRX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }
          return adjecentX;
        }, Math.max()) - block.width;

      const cx =
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetCX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetCX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }
          return adjecentX;
        }, Math.max()) - Math.floor(block.width / 2);

      return Math.abs(rx - currentOffsetFromSection.x) < Math.abs(cx - currentOffsetFromSection.x)
        ? { snappedTo: "r" as const, value: rx }
        : { snappedTo: "c" as const, value: cx };
    }

    private getSnappedLX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetLX = currentOffsetFromSection.x;
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const lx = Object.values(layoutMap).reduce((adjecentX, pos) => {
        if (Math.abs(offsetLX - pos.l) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l;
        }

        if (Math.abs(offsetLX - (pos.l + pos.width)) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l + pos.width;
        }

        if (Math.abs(offsetLX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l + Math.floor(pos.width / 2);
        }

        return adjecentX;
      }, Math.max());

      const cx =
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetCX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetCX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }

          return adjecentX;
        }, Math.max()) - Math.floor(block.width / 2);

      return Math.abs(lx - currentOffsetFromSection.x) < Math.abs(cx - currentOffsetFromSection.x)
        ? { snappedTo: "l" as const, value: lx }
        : { snappedTo: "c" as const, value: cx };
    }

    private getSnappedBY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetBY = currentOffsetFromSection.y + block.height;
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const by =
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetBY - pos.t) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t;
          }

          if (Math.abs(offsetBY - (pos.t + pos.height)) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t + pos.height;
          }

          if (Math.abs(offsetBY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - block.height;

      const cy =
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetCY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetCY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - Math.floor(block.height / 2);

      return Math.abs(by - currentOffsetFromSection.y) < Math.abs(cy - currentOffsetFromSection.y)
        ? { snappedTo: "b" as const, value: by }
        : { snappedTo: "c" as const, value: cy };
    }

    private getSnappedTY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetTY = currentOffsetFromSection.y;
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const ty = Object.values(layoutMap).reduce((adjecentY, pos) => {
        if (Math.abs(offsetTY - pos.t) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t;
        }

        if (Math.abs(offsetTY - (pos.t + pos.height)) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t + pos.height;
        }

        if (Math.abs(offsetTY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t + Math.floor(pos.height / 2);
        }

        return adjecentY;
      }, Math.max());

      const cy =
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetCY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetCY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - Math.floor(block.height / 2);

      return Math.abs(ty - currentOffsetFromSection.y) < Math.abs(cy - currentOffsetFromSection.y)
        ? { snappedTo: "t" as const, value: ty }
        : { snappedTo: "c" as const, value: cy };
    }

    private getAdjecentBlockPosition(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset
    ) {
      if (!block.parent || !hasSnapMixin(block.parent)) {
        throw new Error("block is not in snappable parent");
      }

      const layoutMap = this.removeSelectedBlockLayouts(block.parent.getLayoutMap(), block);
      const currentOffsetFromSection = {
        x: currentOffset.x - sectionOffset.x,
        y: currentOffset.y - sectionOffset.y,
      };
      const xRes =
        block.xDirection === "r"
          ? this.getSnappedRX(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedLX(layoutMap, currentOffsetFromSection, block);
      const yRes =
        block.yDirection === "b"
          ? this.getSnappedBY(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedTY(layoutMap, currentOffsetFromSection, block);
      return { xRes, yRes };
    }

    private getSnappedCoords(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { xRes, yRes } = this.getAdjecentBlockPosition(block, currentOffset, sectionOffset);
      const parentOffsetFromSection = {
        x: parentOffset.x - sectionOffset.x,
        y: parentOffset.y - sectionOffset.y,
      };

      const canSnapToX = Math.abs(xRes.value - (parentOffsetFromSection.x + block.l)) < threshhold;
      const canSnapToY = Math.abs(yRes.value - (parentOffsetFromSection.y + block.t)) < threshhold;

      return {
        snappedToX: canSnapToX ? xRes.snappedTo : false,
        snappedToY: canSnapToY ? yRes.snappedTo : false,
        x: canSnapToX ? sectionOffset.x + xRes.value : parentOffset.x + block.l,
        y: canSnapToY ? sectionOffset.y + yRes.value : parentOffset.y + block.t,
      };
    }

    public snap(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { snappedToX, snappedToY, ...snappedCoords } = this.getSnappedCoords(
        block,
        currentOffset,
        sectionOffset,
        parentOffset,
        threshhold
      );

      block.updateCoords(snappedCoords, parentOffset);

      return { snappedToX, snappedToY };
    }
  };
};
