export const rgbaStringToHex = (rgbaString)=> {
  const matches = rgbaString.match(/[\d.]+/g);
  if (!matches || matches.length < 3) {
    throw new Error("Invalid RGBA string");
  }

  const [r, g, b, a] = matches.map(Number);
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a !== undefined && a < 1) {
    const alpha = Math.round(a * 255);
    hex += toHex(alpha);
  }

  return hex;
}
