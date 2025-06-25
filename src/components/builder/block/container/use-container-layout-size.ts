import { ContainerBlock, Text } from "@/domain/builder";
import { useCallback, useMemo } from "react";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useDefaultLayoutSize } from "@/components/builder/property/layout";
import { Device } from "@/domain/builder/mixin";
import { useBlockHistory } from "@/hooks";

export const useContainerLayoutSize = <T extends InstanceType<typeof ContainerBlock>>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
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
      startCaptureSnapshot(`${block.id}-device`);
      block.setDevice(device);
      endCaptureSnapshot(`${block.id}-device`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  return {
    onWidthChange,
    onWidthTypeChange,
    onDeviceChange,
    widthTypes: ["fixed"],
    devices,
  };
};
