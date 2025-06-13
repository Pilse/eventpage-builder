import { Constructor } from "@/type";
import { Text } from "../block";

export type TypographyMixinBlockType = InstanceType<ReturnType<typeof TypographyMixin<Constructor<Text>>>>;

export const TypographyMixin = <TBase extends Constructor<Text>>(Base: TBase) => {
  return class extends Base {
    public writable = true;

    constructor(...args: any[]) {
      super(...args);
      this.setFontName(this.fontName);
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

      const weight = font.weights.find((weight) => weight === this.fontWeight);
      if (weight) {
        return;
      }

      this.fontWeight = font.weights[Math.floor(font.weights.length / 2)];
    }

    public setFontWeight(fontWeight: number) {
      this.fontWeight = fontWeight;
    }
  };
};

const fonts = [
  {
    fontName: "Pretendard",
    thumbnail: "/image/pretendard.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    fontName: "Ownglyph_ParkDaHyun",
    thumbnail: "/image/ownglyph_parkdahyun.png",
    weights: [400],
  },
  {
    fontName: "GmarketSans",
    thumbnail: "/image/gmarketsans.png",
    weights: [300, 500, 700],
  },
  {
    fontName: "Paperlogy",
    thumbnail: "/image/paperlogy.png",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    fontName: "Ownglyph_corncorn",
    thumbnail: "/image/ownglyph_corncorn.png",
    weights: [400],
  },
  {
    fontName: "SBAggro",
    thumbnail: "/image/aggro.png",
    weights: [300, 500, 700],
  },
  {
    fontName: "Chosunilbo_gulim",
    thumbnail: "/image/chosunilbo_gulim.png",
    weights: [400],
  },
  {
    fontName: "Chosunilbo_myungjo",
    thumbnail: "/image/chosunilbo_myungjo.png",
    weights: [400],
  },
  {
    fontName: "Danjo",
    thumbnail: "/image/danjo.png",
    weights: [400],
  },
  {
    fontName: "GowunBatang",
    thumbnail: "/image/gowunbatang.png",
    weights: [400, 700],
  },
  {
    fontName: "KakaoBigSans",
    thumbnail: "/image/kakaobig.png",
    weights: [400, 700, 800],
  },
  {
    fontName: "LINESeedSansKR",
    thumbnail: "/image/lineseed.png",
    weights: [100, 400, 700],
  },
  {
    fontName: "SDKukdetopokki",
    thumbnail: "/image/sdkukdetoki.png",
    weights: [400],
  },
  {
    fontName: "HangeulNuri",
    thumbnail: "/image/hangeulnuri.png",
    weights: [400],
  },
  {
    fontName: "Independence_hall",
    thumbnail: "/image/independence_hall.png",
    weights: [400],
  },
];
