export const DAYS = [
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;
export const STARTING_HOUR = 7;
export const ENDING_HOUR = 22;
export const HOUR_DIVISION = 4;
export const CELL_COUNT = (ENDING_HOUR - STARTING_HOUR) * HOUR_DIVISION;
export const SLOT_TIME = 60 / HOUR_DIVISION;
export const PERIOD_DURATION = 90;

type EventTypeType = {
  name: string;
  shortName: string; // must match the name that used in the summary in the ical event
  color: `#${string}${string}${string}`;
};

const eventType_Vorlesung = {
  name: "Vorlesung",
  shortName: "V",
  color: "#5167E2",
} as const satisfies EventTypeType;

const eventType_Praktikum = {
  name: "Praktikum",
  shortName: "P",
  color: "#F4A766",
} as const satisfies EventTypeType;

const eventType_Uebung = {
  name: "Übung",
  shortName: "SU",
  color: "#5C7238",
} as const satisfies EventTypeType;

export const eventTypes = [
  eventType_Vorlesung,
  eventType_Praktikum,
  eventType_Uebung,
] as const;
