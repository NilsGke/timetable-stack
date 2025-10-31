import {
  CELL_COUNT,
  DAYS,
  eventTypes,
  SLOT_TIME,
  STARTING_HOUR,
} from "@/constants";
import type { UserType } from "@/helpers/app.types";
import { colorMap, colorNames } from "@/helpers/colors";
import { useEventUi } from "@/hooks/useEventUi";

export function TimeTable({ users }: { users: UserType[] }) {
  const { clickAreaRef, highlighterElement, calculateGridPosition } =
    useEventUi();
  console.log("rerender");
  return (
    <div
      className={
        `p-8 grid grid-cols-[auto_repeat(5,1fr)] size-full ` +
        `grid-rows-[repeat(${CELL_COUNT + 1},1fr)]`
      }
    >
      {/* top row dates */}
      {DAYS.map((day, index) => (
        <div
          key={day}
          className="row-start-1 text-center"
          style={{ gridColumnStart: index + 2 }}
        >
          {day}
        </div>
      ))}

      {/* sidebar times */}
      {Array.from({ length: CELL_COUNT }).map((_, index) => {
        const hour = STARTING_HOUR + Math.floor((SLOT_TIME * index) / 60);
        const minute = (SLOT_TIME * index) % 60;
        return (
          <div
            key={index}
            className="col-start-1 w-full text-right text-xs dark:text-zinc-300 text-zinc-800"
            style={{ gridRowStart: index + 2 }}
          >
            {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute}
          </div>
        );
      })}

      {/* horizontal dividers */}
      {Array.from({ length: CELL_COUNT }).map((_, index) => (
        <div
          key={index}
          className="bg-zinc-400 dark:bg-zinc-700 h-[.5px] col-start-1 col-end-7"
          style={{ gridRowStart: index + 2 }}
        />
      ))}

      {/* vertical dividers */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-zinc-400 dark:bg-zinc-700 w-[.5px] row-start-1"
          style={{ gridColumnStart: index + 2, gridRowEnd: CELL_COUNT + 2 }}
        />
      ))}

      {/* click area */}
      <div
        className="row-start-2 col-start-2 col-end-7"
        style={{ gridRowEnd: CELL_COUNT + 2 }}
        ref={clickAreaRef}
      />

      {/* highlighter element */}
      <div
        className="size-[calc(100%-1px)] bg-zinc-100 dark:bg-zinc-900 ml-px mt-px"
        ref={highlighterElement}
      />

      {/* events */}
      {users.map((user) =>
        user.events.map((event) => {
          const type = eventTypes.find((t) => t.name === event.type)!;
          return (
            <div
              className="mx-0.5 rounded-md text-xs grid grid-rows-[auto_1fr] overflow-hidden *:px-1 border-3"
              key={event.startTime.toISOString()}
              style={{
                ...calculateGridPosition(event),
                borderColor: type.color,
              }}
            >
              <div
                style={{ backgroundColor: type.color }}
                className="text-white"
              >
                {event.module.shortName} – {type.shortName}
              </div>
              <div
                className="h-full text-black"
                style={{ backgroundColor: colorMap[user.color] }}
              >
                {event.module.name}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
