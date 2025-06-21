import { ContainerBlock, Text } from "@/domain/block";
import { useCallback, useMemo } from "react";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useDefaultLayoutSize } from "@/component/property/layout";
import { Device } from "@/domain/mixin/";

export const useContainerLayoutSize = <T extends InstanceType<typeof ContainerBlock>>(block: T) => {
  const { onWidthChange: handleWidthChange, onWidthTypeChange: handleWidthTypeChange } =
    useDefaultLayoutSize(block);

  const onWidthChange = useCallback(
    (width: number) => {
      handleWidthChange?.(width, () => {
        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleWidthChange]
  );

  const onWidthTypeChange = useCallback(
    (widthType: Text["widthType"]) => {
      handleWidthTypeChange?.(
        widthType,
        () => {
          const parent = block.parent;
          if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
            parent.autoLayout();
          }
        },
        { flush: true }
      );
    },
    [block, handleWidthTypeChange]
  );

  const devices = useMemo(() => {
    return block.getDevices();
  }, [block]);

  const onDeviceChange = useCallback(
    (device: Device) => {
      block.setDevice(device);
    },
    [block]
  );

  return {
    onWidthChange,
    onWidthTypeChange,
    onDeviceChange,
    widthTypes: ["fixed"],
    devices,
  };
};
