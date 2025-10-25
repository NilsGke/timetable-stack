import { CELL_COUNT } from "@/constants";
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
  return { clickAreaRef, highlighterElement: highlighterRef };
};
