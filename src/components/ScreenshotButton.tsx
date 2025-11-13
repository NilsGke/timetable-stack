import { ImagesIcon, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  downloadScreenshot,
  formatMap,
  generateScreenshot,
  openImageInNewTab,
} from "@/helpers/screenshot";
import { useState, type RefObject } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "./ui/label";
import { useTheme, type Theme } from "@/helpers/themeProvider";
import { toast } from "sonner";

export default function ScreenshotButton({
  className,
  timetableRef: timetableElement,
}: {
  className?: string;
  timetableRef: RefObject<HTMLElement | null>;
}) {
  const [format, setFormat] = useState<keyof typeof formatMap>("JPEG");
  const { theme } = useTheme();
  const [exportTheme, setExportTheme] = useState(
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme,
  );

  const screenshot = async () => {
    if (timetableElement.current === null) {
      toast.error("Error while exporting");
      throw Error("timetableRef is null");
    }

    const body = document.body;
    const html = document.querySelector("html");
    const watermark = document.getElementById("watermark");

    if (!html) {
      toast.error("error while exporting");
      throw Error("html is undefined");
    }
    if (!watermark) {
      toast.error("error while exporting");
      throw Error("watermark is undefined");
    }

    html.classList.remove("light", "dark");
    html.classList.add(exportTheme);
    body.classList.remove("light", "dark");
    body.classList.add(exportTheme);
    watermark.style.display = "flex";

    const imageData = await generateScreenshot(
      timetableElement.current,
      formatMap[format],
    );

    html.classList.remove(exportTheme);
    html.classList.add(
      theme !== "system"
        ? theme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );
    body.classList.remove(exportTheme);
    body.classList.add(theme);
    watermark.style.display = "none";

    return imageData;
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className={className}>
              <ImagesIcon className="size-6" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Export as image</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export options</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6">
          {/* theme selector */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <ToggleGroup
              type="single"
              value={exportTheme}
              onValueChange={(theme: Exclude<Theme, "system">) =>
                setExportTheme(theme)
              }
            >
              <ToggleGroupItem
                value={"light" satisfies Theme}
                aria-label="light"
              >
                <Sun />
              </ToggleGroupItem>
              <ToggleGroupItem value={"dark" satisfies Theme} aria-label="dark">
                <Moon />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* format selector */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={format}
              onValueChange={(f: keyof typeof formatMap) => setFormat(f)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(formatMap).map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose>
            <Button onClick={() => screenshot().then(downloadScreenshot)}>
              Download
            </Button>
          </DialogClose>

          <DialogClose>
            <Button
              onClick={() => screenshot().then(openImageInNewTab)}
              variant="secondary"
            >
              Open in new Tab
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
