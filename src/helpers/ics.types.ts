// AI-Generated

// Base structure for an iCalendar component node
export type IcalNode = [
  string, // component name (e.g. "vcalendar", "vevent", "vtimezone", etc.)
  IcalProperty[], // properties list
  IcalNode[] // child components (nested)
];

// Each property in the node has:
// [ name, parameters, valueType, value ]
export type IcalProperty = [string, IcalParams, IcalValueType, IcalValue];

export interface IcalParams {
  tzid?: string;
  [key: string]: string | undefined;
}

// Possible value types
export type IcalValueType = "text" | "date-time" | "utc-offset" | "recur";

// Possible values for the given types
export type IcalValue = string | number | boolean | IcalRecurRule;

// Recurrence rule object
export interface IcalRecurRule {
  freq: string; // e.g. "WEEKLY", "YEARLY"
  until?: string;
  byday?: string;
  bymonth?: number;
  [key: string]: string | number | undefined;
}

// root structure
export type VCalendar = ["vcalendar", IcalProperty[], IcalNode[]];
