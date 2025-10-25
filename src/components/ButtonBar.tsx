import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { InfoPopover } from "./InfoPopover";

export function ButtonBar() {
  return (
    <div className="p-8 flex gap-2 justify-center border-t">
      <DarkModeToggle />
      <Button variant="outline" asChild size="icon" aria-label="Submit">
        <a href="https://github.com/NilsGke/timetable-stack" target="_blank">
          <Github />
        </a>
      </Button>
      <InfoPopover />
    </div>
  );
}
