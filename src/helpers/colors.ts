export const colorNames = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "white",
] as const;

type Color = `#${string}${string}${string}`;

export const colorMap = {
  red: "#ffadad",
  orange: "#ffd6a5",
  yellow: "#fdffb6",
  green: "#caffbf",
  cyan: "#9bf6ff",
  blue: "#a0c4ff",
  purple: "#bdb2ff",
  pink: "#ffc6ff",
  white: "#fffffc",
} as const satisfies Record<(typeof colorNames)[number], Color>;

export const getUnusedColor = (usedColors: (typeof colorNames)[number][]) =>
  colorNames.filter((name) => !usedColors.includes(name)).at(0) || "red";
