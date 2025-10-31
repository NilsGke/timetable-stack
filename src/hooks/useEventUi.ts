import {
  CELL_COUNT,
  HOUR_DIVISION,
  SLOT_TIME,
  STARTING_HOUR,
} from "@/constants";
import type { EventType } from "@/helpers/app.types";
import { useEffect, useRef } from "react";

export const useEventUi = () => {
  const clickAreaRef = useRef<HTMLDivElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  const getMouseCell = (event: MouseEvent) => {
    if (clickAreaRef.current === null) throw Error("click area is null");
    const {
      left: rectX,
      top: rectY,
      width: rectWidth,
      height: rectHeight,
    } = clickAreaRef.current.getBoundingClientRect();

    const [mouseX, mouseY] = [event.clientX, event.clientY];

    const deltaX = mouseX - rectX;
    const deltaY = mouseY - rectY;

    const percentageX = deltaX / rectWidth;
    const percentageY = deltaY / rectHeight;

    const cellX = Math.floor(percentageX * 5);
    const cellY = Math.floor(percentageY * CELL_COUNT);

    return { cellX, cellY };
  };

  const calculateGridPosition = (module: EventType) => {
    const startHours = module.startTime.getHours();
    const startMinutes = module.startTime.getMinutes();
    const endHours = module.endTime.getHours();
    const endMinutes = module.endTime.getMinutes();
    const day = module.startTime.getDay();

    const rowSlot =
      (startHours - STARTING_HOUR) * HOUR_DIVISION + startMinutes / SLOT_TIME;

    const rowCount =
      (endHours - startHours) * HOUR_DIVISION + endMinutes / SLOT_TIME;

    return {
      gridRowStart: rowSlot + 2,
      gridColumnStart: day + 1,
      gridRowEnd: rowSlot + 1 + rowCount,
    };
  };

  useEffect(() => {
    if (clickAreaRef.current === null) throw Error("click area is null");

    const mouseDown = (event: MouseEvent) => {
      getMouseCell(event);
    };
    const mouseMove = (event: MouseEvent) => {
      if (highlighterRef.current === null) throw Error("highlighter is null");
      const { cellX, cellY } = getMouseCell(event);
      highlighterRef.current.style.gridColumnStart = (cellX + 2).toString();
      highlighterRef.current.style.gridRowStart = (cellY + 2).toString();
    };

    clickAreaRef.current.addEventListener("mousedown", mouseDown);
    clickAreaRef.current.addEventListener("mousemove", mouseMove);
  }, []);
  return {
    clickAreaRef,
    highlighterElement: highlighterRef,
    calculateGridPosition,
  };
};
