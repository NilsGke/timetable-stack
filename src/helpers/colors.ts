export const colorNames = [
  "palette-red",
  "palette-orange",
  "palette-yellow",
  "palette-green",
  "palette-cyan",
  "palette-blue",
  "palette-purple",
  "palette-pink",
  "palette-white",
] as const;

export type Color = (typeof colorNames)[number];

export const getUnusedColor = (usedColors: (typeof colorNames)[number][]) =>
  colorNames.filter((name) => !usedColors.includes(name)).at(0) ||
  colorNames[0];
