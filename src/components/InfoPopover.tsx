import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, CircleQuestionMark, Copy } from "lucide-react";
import { Button } from "./ui/button";

export function InfoPopover() {
  async function copy() {
    const copyIcon = document.getElementById("copy-button-copy");
    const checkIcon = document.getElementById("copy-button-check");
    await window.navigator.clipboard.writeText(
      "https://aor.cs.hs-rm.de/plans.ics?user_plan=true"
    );
    copyIcon!.style.opacity = "0";
    checkIcon!.style.opacity = "1";
    await new Promise((r) => setTimeout(r, 1000));
    copyIcon!.style.opacity = "1";
    checkIcon!.style.opacity = "0";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <CircleQuestionMark />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What is this and how does it work?</DialogTitle>
          <DialogDescription>
            This single-page React application displays university timetables
            for multiple users, providing a clear overview of each person’s
            schedule at any given time.
            <br />
            <br />
            The import button at the bottom left lets you import a csv file that
            you can export at
            <span className="flex underline items-center">
              aor.cs.hs-rm.de/plans.ics?user_plan=true
              <Button
                size="sm"
                variant="link"
                onClick={copy}
                className="relative"
              >
                <Copy id="copy-button-copy" className="transition-opacity" />
                <Check
                  id="copy-button-check"
                  className="opacity-0 absolute transition-opacity"
                />
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
