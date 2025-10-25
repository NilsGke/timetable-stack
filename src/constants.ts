export const DAYS = [
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Firday",
] as const;
export const STARTING_TIME = 7;
export const ENDING_TIME = 22;
export const HOUR_DIVISION = 4;
export const CELL_COUNT = (ENDING_TIME - STARTING_TIME) * HOUR_DIVISION;
export const SLOT_TIME = 60 / HOUR_DIVISION;
export const PERIOD_DURATION = 90;
