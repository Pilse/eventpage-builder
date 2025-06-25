import { Block } from "@/domain/builder";
import { Constructor, LayoutMap, Offset } from "@/type";

export type SnapBaseMixinBlockType = InstanceType<
  ReturnType<
    typeof SnapBaseMixin<
      Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
    >
  >
>;

export const SnapBaseMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
    }

    protected removeSelectedBlockLayouts(layoutMap: LayoutMap, block: InstanceType<typeof Block>) {
      const copiedlayoutMap = { ...layoutMap };
      Block.traverse(block, {
        beforeTraverse: (block) => {
          delete copiedlayoutMap[block.id];
        },
      });
      return copiedlayoutMap;
    }

    protected getSnappedRX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetRX = currentOffsetFromSection.x + block.width;

      return (
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
        }, Math.max()) - block.width
      );
    }

    protected getSnappedRCX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const rx = this.getSnappedRX(layoutMap, currentOffsetFromSection, block);
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

    protected getSnappedLX(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetLX = currentOffsetFromSection.x;

      return Object.values(layoutMap).reduce((adjecentX, pos) => {
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
    }

    protected getSnappedLCX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const lx = this.getSnappedLX(layoutMap, currentOffsetFromSection);
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

    protected getSnappedBY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetBY = currentOffsetFromSection.y + block.height;

      return (
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
        }, Math.max()) - block.height
      );
    }

    protected getSnappedBCY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const by = this.getSnappedBY(layoutMap, currentOffsetFromSection, block);
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

    protected getSnappedTY(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetTY = currentOffsetFromSection.y;

      return Object.values(layoutMap).reduce((adjecentY, pos) => {
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
    }

    protected getSnappedTCY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const ty = this.getSnappedTY(layoutMap, currentOffsetFromSection);
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
  };
};
