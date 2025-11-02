import {
  eventTypes,
  HOUR_DIVISION,
  SLOT_TIME,
  STARTING_HOUR,
} from "@/constants";
import type { EventType, UserType } from "./app.types";

export const calculateEventPositions = (event: EventType) => {
  const startHours = event.startTime.getHours();
  const startMinutes = event.startTime.getMinutes();
  const endHours = event.endTime.getHours();
  const endMinutes = event.endTime.getMinutes();

  const rowSlot =
    (startHours - STARTING_HOUR) * HOUR_DIVISION + startMinutes / SLOT_TIME;

  const rowCount =
    (endHours - startHours) * HOUR_DIVISION +
    (endMinutes - startMinutes) / SLOT_TIME +
    1;

  return {
    gridRowStart: rowSlot + 2,
    gridRowEnd: rowSlot + 1 + rowCount,
  };
};

const createKey = ({
  gridRowStart,
  gridRowEnd,
  moduleName,
}: ReturnType<typeof calculateEventPositions> & {
  moduleName: string;
}) => `${gridRowStart}-${gridRowEnd}-${moduleName}` as const;

export const createRects = (users: UserType[]) => {
  // one column for each day since days can be handled separately
  const eventColumns: [
    (EventType & { user: UserType })[],
    (EventType & { user: UserType })[],
    (EventType & { user: UserType })[],
    (EventType & { user: UserType })[],
    (EventType & { user: UserType })[]
  ] = [[], [], [], [], []];

  // flatten user events
  users.forEach((user) =>
    user.events.forEach((event) =>
      eventColumns[event.startTime.getDay() - 1].push({
        ...event,
        user,
      })
    )
  );

  // sort events by their starting time
  eventColumns.forEach(
    (column, index) =>
      (eventColumns[index] = column.sort(
        (a, b) => a.startTime.getTime() - b.startTime.getTime()
      ))
  );

  const rects2 = eventColumns.map((column) => {
    const dayMap = new Map<
      ReturnType<typeof createKey>,
      ReturnType<typeof calculateEventPositions> & {
        event: EventType;
        users: UserType[];
        gridColumnStart: number;
        gridColumnEnd: number;
      }
    >();

    let colCount = 1;

    column.forEach((event) => {
      const position = calculateEventPositions(event);
      const key = createKey({ ...position, moduleName: event.module.id });
      const existing = dayMap.get(key);
      const eventType = eventTypes.find((t) => t.name === event.type);
      if (eventType === undefined) throw Error("could not find event type");
      if (existing) return existing.users.push(event.user);

      const intersectingEvents = [...dayMap.values()].filter(
        ({ event: prevEvent }) =>
          prevEvent.endTime.getTime() > event.startTime.getTime()
      );

      const usedCols = intersectingEvents.map((event) => event.gridColumnStart);
      const usedColsSet = new Set(usedCols);

      let gridColumnStart = 1;
      while (usedColsSet.has(gridColumnStart)) gridColumnStart++;

      // find the next highest number in the set
      const nextUsed = Math.min(
        ...[...usedCols].filter((n) => n > gridColumnStart)
      );

      // distance to the next highest
      const gridColumnEnd = (nextUsed ? nextUsed - gridColumnStart : 0) + 1;

      colCount = Math.max(colCount, gridColumnStart);
      console.log(gridColumnStart);

      dayMap.set(key, {
        ...position,
        users: [event.user],
        event,
        gridColumnStart,
        gridColumnEnd,
      });
    });

    return { colCount, events: [...dayMap.values()] };
  });

  console.log(rects2);

  const rects: Map<
    ReturnType<typeof createKey>,
    {
      users: UserType[];
      event: EventType;
      gridColumnStart: number;
    } & ReturnType<typeof calculateEventPositions>
  > = new Map();

  users.forEach((user) => {
    user.events.forEach((event) => {
      const position = calculateEventPositions(event);
      const key = createKey({ ...position, moduleName: event.module.id });
      const existing = rects.get(key);
      const eventType = eventTypes.find((t) => t.name === event.type);
      if (eventType === undefined) throw Error("could not find event type");
      if (!existing)
        rects.set(key, {
          ...position,
          users: [user],
          event,
          gridColumnStart: 0,
        });
      else existing.users.push(user);
    });
  });
  console.log(rects);
  return rects2;
};
