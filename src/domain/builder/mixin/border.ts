import { Color, Constructor } from "@/type";
import { Block } from "../block";
import {
  isValidHexColor as _isValidHexColor,
  hexColorToRgba as _hexColorToRgba,
  rgbaToHexColor as _rgbaToHexColor,
} from "@/util/color";

export type BorderMixinBlockType = InstanceType<ReturnType<typeof BorderMixin<Constructor<Block>>>>;

export const BorderMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public strokeable = true;
    public borderColorHex: string;

    constructor(...args: any[]) {
      super(...args);
      this.borderColorHex = _rgbaToHexColor(this.borderColor);
    }

    public updateBorderColorHex(hex: string) {
      this.borderColorHex = hex;
      if (_isValidHexColor(hex)) {
        this.borderColor = _hexColorToRgba(hex);
        this.borderColorHex = _rgbaToHexColor(this.borderColor);
      }
    }

    public commitUpdateBordercolorHex() {
      if (_isValidHexColor(this.borderColorHex)) {
        this.borderColor = _hexColorToRgba(this.borderColorHex);
      }
      this.borderColorHex = _rgbaToHexColor(this.borderColor);
    }

    public commitUpdateBorderColorRgba(rgba: Color) {
      this.borderColor = rgba;
      this.borderColorHex = _rgbaToHexColor(this.borderColor);
    }
  };
};
