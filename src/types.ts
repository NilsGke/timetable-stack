import { colorNames } from "./helpers/colors";
import { z } from "zod";

export const eventTypeSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  color: z.string(),
});

export const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
});

export const eventSchema = z.object({
  type: eventTypeSchema,
  timeSlot: z.number(),
  room: z.string(),
  moduleSchema,
});

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  color: z.enum(colorNames),
  events: z.array(eventSchema),
});

export type EventTypeType = z.infer<typeof eventTypeSchema>;
export type EventType = z.infer<typeof eventSchema>;
export type ModuleType = z.infer<typeof moduleSchema>;
export type UserType = z.infer<typeof userSchema>;

export const eventTypes: EventTypeType[] = [
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
