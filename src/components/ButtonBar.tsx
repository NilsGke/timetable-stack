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
    <div className="px-8 py-4  border-t">
      <div className="flex gap-2 justify-center">
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
      <div className="text-center mt-2 text-xs space-x-2 text-zinc-400 dark:text-zinc-500">
        <a target="_blank" href="https://nilsgke.dev">
          Nils Goeke
        </a>
        <span>|</span>
        <a target="_blank" href="https://legal.nilsgke.dev/impressum">
          Impressum
        </a>
        <span>|</span>
        <a target="_blank" href="https://legal.nilsgke.dev/datenschutz">
          Datenschutz
        </a>
      </div>
    </div>
  );
}
