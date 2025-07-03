import { Constructor } from "@/type";
import { Block } from "../block";
import { hasDropColMixin, hasDropRowMixin } from "@/shared/util";

export type DeviceMixinBlockType = InstanceType<
  ReturnType<typeof DeviceMixin<Constructor<Block & { device: string | null }>>>
>;

export type Device = (typeof devicePreset)[number]["name"];

export const DeviceMixin = <TBase extends Constructor<Block & { device: string | null }>>(Base: TBase) => {
  return class extends Base {
    public deviceable = true;

    private deviceMap: Map<Device, number> = new Map();

    constructor(...args: any[]) {
      super(...args);
      Object.values(devicePreset).forEach(({ name, width }) => {
        this.deviceMap.set(name, width);
      });
    }

    public getDevices() {
      return devicePreset;
    }

    public setDevice(preset: Device) {
      const width = this.deviceMap.get(preset);
      if (width) {
        this.width = width;
        this.device = preset;
        if (hasDropColMixin(this) || hasDropRowMixin(this)) {
          this.autoLayout();
        }
      }
    }

    public getDeviceType(name: Device) {
      return devicePreset.find((device) => device.name === name)?.device;
    }

    public unsetDevice() {
      this.device = null;
    }
  };
};

const devicePreset = [
  { device: "mobile" as const, name: "iPhone Pro Max" as const, width: 430 },
  { device: "mobile" as const, name: "iPhone Pro" as const, width: 393 },
  { device: "mobile" as const, name: "iPhone" as const, width: 390 },
  { device: "mobile" as const, name: "iPhone SE" as const, width: 375 },
  { device: "mobile" as const, name: "Galaxy S Ultra" as const, width: 384 },
  { device: "mobile" as const, name: "Galaxy S" as const, width: 360 },
  { device: "tablet" as const, name: "iPad mini 8.3" as const, width: 744 },
];
