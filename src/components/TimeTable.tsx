import {
  CELL_COUNT,
  DAYS,
  eventTypes,
  SLOT_TIME,
  STARTING_HOUR,
} from "@/constants";
import type { UserType } from "@/helpers/app.types";
import { createRects } from "@/helpers/timeTable";
import { cn } from "@/lib/utils";

export function TimeTable({ users }: { users: UserType[] }) {
  const rects = createRects(users);
  return (
    <div
      className="p-8 grid grid-cols-[auto_repeat(5,1fr)] size-full"
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

      {rects.map(({ colCount, events }, index) => (
        <div
          key={index}
          className="row-start-2 grid"
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
              gridColumnEnd,
              gridRowStart,
              gridRowEnd,
            }) => {
              const type = eventTypes.find((t) => t.name === event.type)!;
              return (
                <div
                  className="mx-0.5 rounded-md text-xs grid grid-rows-[auto_1fr] overflow-hidden border-3"
                  key={crypto.randomUUID()}
                  style={{
                    gridRowStart,
                    gridRowEnd,
                    gridColumnStart,
                    // gridColumnEnd,
                    borderColor: type.color,
                    backgroundColor: type.color,
                  }}
                >
                  <div
                    className="text-white px-1"
                    style={{ backgroundColor: type.color }}
                  >
                    {event.module.shortName} – {type.shortName} –{" "}
                    {event.location}
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
                          }
                        )}
                      >
                        {user.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      ))}
    </div>
  );
}
