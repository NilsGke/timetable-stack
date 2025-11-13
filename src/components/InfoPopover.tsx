import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleQuestionMark } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AORLink from "./AORLink";

export function InfoPopover({ className }: { className?: string }) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className={className}>
              <CircleQuestionMark className="size-6" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Info</TooltipContent>
      </Tooltip>
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
            <AORLink />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
