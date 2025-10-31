import { eventTypes } from "@/constants";
import { colorNames } from "./colors";
import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
});

export const eventSchema = z.object({
  type: z.enum(eventTypes.map(({ name }) => name)),
  startTime: z.string().transform((v) => z.date().parse(new Date(v))),
  endTime: z.string().transform((v) => z.date().parse(new Date(v))),
  location: z.string(),
  group: z.string().optional(),
  module: moduleSchema,
});

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  color: z.enum(colorNames),
  events: z.array(eventSchema),
});

export type EventType = z.infer<typeof eventSchema>;
export type ModuleType = z.infer<typeof moduleSchema>;
export type UserType = z.infer<typeof userSchema>;
