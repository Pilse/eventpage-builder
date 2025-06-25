import { Color } from "@/type";

export const isValidHexColor = (hexColor: string) => {
  if (typeof hexColor !== "string") {
    return false;
  }

  if (hexColor.startsWith("#")) {
    return false;
  }

  if (![3, 4, 6, 8].includes(hexColor.length)) {
    return false;
  }

  if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hexColor)) {
    return false;
  }

  if (
    (hexColor.length === 3 || hexColor.length === 4) &&
    !(hexColor[0] === hexColor[1] && hexColor[1] === hexColor[2])
  ) {
    return false;
  }

  return true;
};

export const hexColorToRgba = (hexColor: string) => {
  if (
    (hexColor.length === 3 || hexColor.length === 4) &&
    hexColor[0] === hexColor[1] &&
    hexColor[1] === hexColor[2]
  ) {
    hexColor = hexColor
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  let a = 1;
  if (hexColor.length === 8) {
    a = parseInt(hexColor.slice(6, 8), 16) / 255;
    a = +a.toFixed(3);
  }

  return { r, g, b, a };
};

export const rgbaToHexColor = ({ r, g, b, a }: Color) => {
  const toHex = (v: number) => v.toString(16).padStart(2, "0").toUpperCase();

  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);
  const aHex = toHex(Math.round(a * 255));

  return aHex === "FF" ? rHex + gHex + bHex : rHex + gHex + bHex + aHex;
};

export const rgbaToCss = ({ r, g, b, a }: Color) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
