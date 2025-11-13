import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";

export default function AORLink() {
  async function copy() {
    const copyIcon = document.getElementById("copy-button-copy");
    const checkIcon = document.getElementById("copy-button-check");
    await window.navigator.clipboard.writeText(
      "https://aor.cs.hs-rm.de/plans.ics?user_plan=true",
    );
    copyIcon!.style.opacity = "0";
    checkIcon!.style.opacity = "1";
    await new Promise((r) => setTimeout(r, 1000));
    copyIcon!.style.opacity = "1";
    checkIcon!.style.opacity = "0";
  }
  return (
    <span
      className="inline-flex underline items-center cursor-pointer"
      onClick={copy}
    >
      aor.cs.hs-rm.de/plans.ics?user_plan=true
      <Button size="sm" variant="link" onClick={copy} className="relative">
        <Copy id="copy-button-copy" className="transition-opacity" />
        <Check
          id="copy-button-check"
          className="opacity-0 absolute transition-opacity"
        />
      </Button>
    </span>
  );
}
