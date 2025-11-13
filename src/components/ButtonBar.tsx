import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { InfoPopover } from "./InfoPopover";
import { FileInput } from "./FileInput";
import type { useUsers } from "@/hooks/useUsers";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ScreenshotButton from "./ScreenshotButton";
import type { RefObject } from "react";

export function ButtonBar({
  users,
  addUser,
  updateUser,
  removeUser,
  reorderUsers,
  timetableRef,
}: ReturnType<typeof useUsers> & {
  timetableRef: RefObject<HTMLElement | null>;
}) {
  return (
    <div className="p-8 flex gap-2 justify-center border-t">
      <DarkModeToggle className="size-12" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            asChild
            size="icon"
            aria-label="Submit"
            className="size-12"
          >
            <a
              href="https://github.com/NilsGke/timetable-stack"
              target="_blank"
            >
              <Github className="size-6" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Repository</TooltipContent>
      </Tooltip>

      <InfoPopover className="size-12" />

      <ScreenshotButton className="size-12" timetableRef={timetableRef} />

      <FileInput
        className="size-12"
        users={users}
        addUser={addUser}
        updateUser={updateUser}
        removeUser={removeUser}
        reorderUsers={reorderUsers}
      />
    </div>
  );
}
