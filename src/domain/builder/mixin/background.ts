import { Color, Constructor } from "@/type";
import { Block } from "../block";
import {
  isValidHexColor as _isValidHexColor,
  hexColorToRgba as _hexColorToRgba,
  rgbaToHexColor as _rgbaToHexColor,
} from "@/shared/util/color";

export type BackgroundMixinBlockType = InstanceType<ReturnType<typeof BackgroundMixin<Constructor<Block>>>>;

export const BackgroundMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public fillable = true;
    public backgroundColorHex: string;

    constructor(...args: any[]) {
      super(...args);
      this.backgroundColorHex = _rgbaToHexColor(this.backgroundColor);
    }

    public updateBgColorHex(hex: string) {
      this.backgroundColorHex = hex;
      if (_isValidHexColor(hex)) {
        this.backgroundColor = _hexColorToRgba(hex);
        this.backgroundColorHex = _rgbaToHexColor(this.backgroundColor);
      }
    }

    public commitUpdateBgcolorHex() {
      if (_isValidHexColor(this.backgroundColorHex)) {
        this.backgroundColor = _hexColorToRgba(this.backgroundColorHex);
      }
      this.backgroundColorHex = _rgbaToHexColor(this.backgroundColor);
    }

    public commitUpdateBgColorRgba(rgba: Color) {
      this.backgroundColor = rgba;
      this.backgroundColorHex = _rgbaToHexColor(this.backgroundColor);
    }
  };
};
