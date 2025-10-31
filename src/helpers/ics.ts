import ICAL from "ical.js";
import type { IcalProperty, VCalendar } from "./ics.types";
import { eventSchema, type EventType } from "./app.types";
import { eventTypes } from "@/constants";
import type z from "zod";

const getProperty = (name: string, properties: IcalProperty[]) => {
  const property = properties.find((property) => property[0] === name);
  if (property === undefined) throw Error(`could not find propert "${name}"`);
  return property[3];
};

export const parseIcsContent = (icsText: string) => {
  const data = (ICAL.parse(icsText) as VCalendar)[2];

  const icsEvents = data
    .filter((event) => event[0] === "vevent")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_type, properties]) => properties);

  const modules = icsEvents.map((event) => {
    const uid = getProperty("uid", event);
    const description = getProperty("description", event);
    const summary = getProperty("summary", event);

    const id = uid.toString();
    const name = description.toString().replace(/(.*?) \(.*\).*/, "$1");
    const shortName = summary.toString().replace(/(.*?) \(.*\).*/, "$1");

    return {
      id,
      name,
      shortName,
    };
  });

  const events: EventType[] = icsEvents.map((event) => {
    const summary = getProperty("summary", event).toString();
    const startTime = getProperty("dtstart", event).toString();
    const endTime = getProperty("dtend", event).toString();
    const location = getProperty("location", event).toString();

    const eventType = eventTypes.find(({ shortName }) =>
      new RegExp(`(${shortName}.*)`).test(summary)
    );
    if (eventType === undefined)
      throw Error(
        "event type (summary) could not be matched with one of the eventtypes in constants.ts"
      );

    const module = modules.find((module) =>
      new RegExp(`${module.shortName} \\(.*\\)`).test(summary)
    );
    if (module === undefined)
      throw Error(
        "event module (summary) could not be matched with one of the existing modules"
      );

    const group = /.+ \(.*-(.*)\)/.exec(summary)?.at(0);

    return eventSchema.parse({
      group,
      module,
      startTime,
      endTime,
      location,
      type: eventType.name,
    } satisfies z.input<EventType>);
  });

  return events as EventType[];
};
