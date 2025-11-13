import {
  CELL_COUNT,
  DAYS,
  eventTypes,
  SLOT_TIME,
  STARTING_HOUR,
} from "@/constants";
import type { EventType, UserType } from "@/helpers/app.types";
import { createRects } from "@/helpers/timeTable";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

export function TimeTable({
  users,
  ref,
}: {
  users: UserType[];
  ref: RefObject<HTMLDivElement | null>;
}) {
  const rects = createRects(users);
  return (
    <div
      ref={ref}
      className="p-8 grid grid-cols-[auto_repeat(5,1fr)] bg-white dark:bg-black size-full"
      style={{ gridTemplateRows: `repeat(${CELL_COUNT + 1}, 1fr)` }}
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
          className="bg-zinc-400 dark:bg-zinc-700 h-px col-start-1 col-end-7"
          style={{ gridRowStart: index + 2 }}
        />
      ))}

      {/* vertical dividers */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-zinc-400 dark:bg-zinc-700 w-px row-start-1"
          style={{ gridColumnStart: index + 2, gridRowEnd: CELL_COUNT + 2 }}
        />
      ))}

      {/* events */}
      {rects.map(({ colCount, events }, index) => (
        <TimeTableColumn key={index} {...{ colCount, events }} index={index} />
      ))}

      {/* eport watermark */}
      <div
        id="watermark"
        className="-row-start-5 row-span-3 col-start-3 mx-[20%] col-span-3 justify-center items-center hidden"
      >
        <div className="px-8 text-lg py-3 rounded border bg-zinc-50 text-black/50 dark:text-white/40 dark:bg-zinc-950">
          generated with {window.location.host}
        </div>
      </div>
    </div>
  );
}

function TimeTableColumn({
  events,
  colCount,
  index,
}: ReturnType<typeof createRects>[number] & { index: number }) {
  return (
    <div
      className="row-start-2 grid px-2"
      style={{
        gridTemplateRows: `repeat(${CELL_COUNT - 1}, 1fr)`,
        gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        gridRowEnd: CELL_COUNT + 1,
        gridColumnStart: index + 2,
      }}
    >
      {events.map(
        ({
          event,
          users,
          gridColumnStart,
          gridRowStart,
          gridRowEnd,
          gridColumnEnd,
        }) => (
          <TimeTableEvent
            key={event.location + event.startTime.getTime()}
            event={event}
            users={users}
            style={{
              gridColumnStart: gridColumnStart.toString(),
              gridColumnEnd: gridColumnEnd.toString(),
              gridRowStart: gridRowStart.toString(),
              gridRowEnd: gridRowEnd.toString(),
            }}
          />
        ),
      )}
    </div>
  );
}

function TimeTableEvent({
  style,
  event,
  users,
}: {
  style: {
    gridRowStart: string;
    gridRowEnd: string;
    gridColumnStart: string;
    gridColumnEnd: string;
  };
  event: EventType;
  users: UserType[];
}) {
  const type = eventTypes.find((t) => t.name === event.type)!;
  return (
    <div
      className="mx-0.5 rounded-md text-xs grid grid-rows-[auto_1fr] overflow-hidden border-3"
      key={crypto.randomUUID()}
      style={{
        ...style,
        borderColor: type.color,
        backgroundColor: type.color,
      }}
    >
      <div className="text-white px-1" style={{ backgroundColor: type.color }}>
        {event.module.shortName} – {type.shortName} – {event.location}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${users.length}, 1fr)`,
        }}
      >
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              `h-full text-black text-lg grid place-items-center`,
              `bg-${user.color}`,
              {
                "rounded-l-sm": index === 0,
                "rounded-r-sm": index + 1 === users.length,
              },
            )}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
