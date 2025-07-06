import { Color, Constructor, TextAlign } from "@/type";
import { Text } from "../block";
import {
  isValidHexColor as _isValidHexColor,
  hexColorToRgba as _hexColorToRgba,
  rgbaToHexColor as _rgbaToHexColor,
} from "@/shared/util/color";

export type TypographyMixinBlockType = InstanceType<ReturnType<typeof TypographyMixin<Constructor<Text>>>>;

export const TypographyMixin = <TBase extends Constructor<Text>>(Base: TBase) => {
  return class extends Base {
    public writable = true;
    public fontColorHex: string;
    public textShadowColorHex: string;

    constructor(...args: any[]) {
      super(...args);
      this.setFontName(this.fontName);
      this.fontColorHex = _rgbaToHexColor(this.fontColor);
      this.textShadowColorHex = _rgbaToHexColor(this.textShadow.color);
    }

    public getFont() {
      return fonts.find((font) => font.fontName === this.fontName) ?? fonts[0];
    }

    public getFonts() {
      return fonts;
    }

    public setFontName(fontName: string) {
      const font = fonts.find((font) => font.fontName === fontName);
      if (!font) {
        return;
      }
      this.fontName = fontName;
      this.googleFonts = font.googleFonts;

      const weight = font.weights.find((weight) => weight === this.fontWeight);
      if (weight) {
        return;
      }

      this.fontWeight = font.weights[Math.floor(font.weights.length / 2)];
    }

    public setFontWeight(fontWeight: number) {
      this.fontWeight = fontWeight;
    }

    public setFontSize(fontSize: number) {
      this.fontSize = fontSize;
    }

    public updateFontColorHex(hex: string) {
      this.fontColorHex = hex;
      if (_isValidHexColor(hex)) {
        this.fontColor = _hexColorToRgba(hex);
        this.fontColorHex = _rgbaToHexColor(this.fontColor);
      }
    }

    public commitUpdateFontColorHex() {
      if (_isValidHexColor(this.fontColorHex)) {
        this.fontColor = _hexColorToRgba(this.fontColorHex);
      }
      this.fontColorHex = _rgbaToHexColor(this.fontColor);
    }

    public commitUpdateFontColorRgba(rgba: Color) {
      this.fontColor = rgba;
      this.fontColorHex = _rgbaToHexColor(this.fontColor);
    }

    public setLetterSpacing(letterSpacing: number) {
      this.letterSpacing = letterSpacing;
    }

    public setLineHeight(lineHeight: number) {
      this.lineHeight = lineHeight;
    }

    public setTextAlign(textAlign: TextAlign) {
      this.textAlign = textAlign;
    }

    public updateTextShadowColorHex(hex: string) {
      this.textShadowColorHex = hex;
      if (_isValidHexColor(hex)) {
        this.textShadow.color = _hexColorToRgba(hex);
        this.textShadowColorHex = _rgbaToHexColor(this.textShadow.color);
      }
    }

    public commitUpdateShadowColorHex() {
      if (_isValidHexColor(this.textShadowColorHex)) {
        this.textShadow.color = _hexColorToRgba(this.textShadowColorHex);
      }
      this.textShadowColorHex = _rgbaToHexColor(this.textShadow.color);
    }

    public commitUpdateShadowColorRgba(rgba: Color) {
      this.textShadow.color = rgba;
      this.textShadowColorHex = _rgbaToHexColor(this.textShadow.color);
    }
  };
};

const fonts = [
  {
    fontName: "Pretendard",
    thumbnail: "/image/pretendard.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: false,
  },
  {
    fontName: "Ownglyph_ParkDaHyun",
    thumbnail: "/image/ownglyph_parkdahyun.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "GmarketSans",
    thumbnail: "/image/gmarketsans.png",
    weights: [300, 500, 700],
    googleFonts: false,
  },
  {
    fontName: "Paperlogy",
    thumbnail: "/image/paperlogy.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: false,
  },
  {
    fontName: "Ownglyph_corncorn",
    thumbnail: "/image/ownglyph_corncorn.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "SBAggro",
    thumbnail: "/image/aggro.png",
    weights: [300, 500, 700],
    googleFonts: false,
  },
  {
    fontName: "Chosunilbo_gulim",
    thumbnail: "/image/chosunilbo_gulim.png",
    weights: [400, 600],
    googleFonts: false,
  },
  {
    fontName: "Chosunilbo_myungjo",
    thumbnail: "/image/chosunilbo_myungjo.png",
    weights: [400, 600],
    googleFonts: false,
  },
  {
    fontName: "Danjo",
    thumbnail: "/image/danjo.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "GowunBatang",
    thumbnail: "/image/gowunbatang.png",
    weights: [400, 700],
    googleFonts: false,
  },
  {
    fontName: "KakaoBigSans",
    thumbnail: "/image/kakaobig.png",
    weights: [400, 700, 800],
    googleFonts: false,
  },
  {
    fontName: "LINESeedSansKR",
    thumbnail: "/image/lineseed.png",
    weights: [100, 400, 700],
    googleFonts: false,
  },
  {
    fontName: "SDKukdetopokki",
    thumbnail: "/image/sdkukdetoki.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "HangeulNuri",
    thumbnail: "/image/hangeulnuri.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "Independence_hall",
    thumbnail: "/image/independence_hall.png",
    weights: [400],
    googleFonts: false,
  },
  {
    fontName: "Oswald",
    thumbnail: "/image/oswald.png",
    weights: [200, 300, 400, 500, 600, 700],
    googleFonts: true,
  },
  {
    fontName: "Montserrat",
    thumbnail: "/image/montserrat.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: true,
  },
  {
    fontName: "Poppins",
    thumbnail: "/image/poppins.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: true,
  },
  {
    fontName: "Inter",
    thumbnail: "/image/inter.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: true,
  },
  {
    fontName: "Noto Sans",
    thumbnail: "/image/notosans.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    googleFonts: true,
  },
  {
    fontName: "Open Sans",
    thumbnail: "/image/opensans.png",
    weights: [300, 400, 500, 600, 700, 800],
    googleFonts: true,
  },
  {
    fontName: "Roboto",
    thumbnail: "/image/roboto.png",
    weights: [100, 300, 400, 500, 700, 900],
    googleFonts: true,
  },
];
