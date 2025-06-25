import { Color, Constructor } from "@/type";
import { Block } from "../block";
import {
  isValidHexColor as _isValidHexColor,
  hexColorToRgba as _hexColorToRgba,
  rgbaToHexColor as _rgbaToHexColor,
} from "@/shared/util/color";

export type ShadowMixinBlockType = InstanceType<ReturnType<typeof ShadowMixin<Constructor<Block>>>>;

export const ShadowMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public shadowable = true;
    public shadowColorHex: string;

    constructor(...args: any[]) {
      super(...args);
      this.shadowColorHex = _rgbaToHexColor(this.shadow.color);
    }

    public updateShadowColorHex(hex: string) {
      this.shadowColorHex = hex;
      if (_isValidHexColor(hex)) {
        this.shadow.color = _hexColorToRgba(hex);
        this.shadowColorHex = _rgbaToHexColor(this.shadow.color);
      }
    }

    public commitUpdateShadowColorHex() {
      if (_isValidHexColor(this.shadowColorHex)) {
        this.shadow.color = _hexColorToRgba(this.shadowColorHex);
      }
      this.shadowColorHex = _rgbaToHexColor(this.shadow.color);
    }

    public commitUpdateShadowColorRgba(rgba: Color) {
      this.shadow.color = rgba;
      this.shadowColorHex = _rgbaToHexColor(this.shadow.color);
    }
  };
};
