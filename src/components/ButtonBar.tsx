import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { InfoPopover } from "./InfoPopover";
import { FileInput } from "./FileInput";
import type { useUsers } from "@/hooks/useUsers";

export function ButtonBar({
  users,
  addUser,
  updateUser,
  removeUser,
}: ReturnType<typeof useUsers>) {
  return (
    <div className="p-8 flex gap-2 justify-center border-t">
      <DarkModeToggle className="size-12" />
      <Button
        variant="outline"
        asChild
        size="icon"
        aria-label="Submit"
        className="size-12"
      >
        <a href="https://github.com/NilsGke/timetable-stack" target="_blank">
          <Github className="size-6" />
        </a>
      </Button>
      <InfoPopover className="size-12" />
      <FileInput
        className="size-12"
        users={users}
        addUser={addUser}
        updateUser={updateUser}
        removeUser={removeUser}
      />
    </div>
  );
}
