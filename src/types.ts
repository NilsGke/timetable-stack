import type { colorMap } from "./helpers/colors";

export type UserType = {
  id: string;
  name: string;
  color: keyof typeof colorMap;
  events: Event[];
};

type EventType = {
  name: string;
  shortName: string;
  color: string;
};

type Event = {
  name: string;
  slot: number;
  type: EventType;
};

export const EventTypes: EventType[] = [
  {
    name: "Vorlesung",
    shortName: "V",
    color: "#5167E2",
  },
  {
    name: "Praktikum",
    shortName: "P",
    color: "#F4A766",
  },
  {
    name: "Seminaristischer Unterricht",
    shortName: "SU",
    color: "#5C7238",
  },
];
