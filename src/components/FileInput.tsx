import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useState, type ChangeEventHandler } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User } from "./User";
import type { useUsers } from "@/hooks/useUsers";
import { parseIcsContent } from "@/helpers/ics";

export function FileInput({
  users,
  addUser,
  updateUser,
  removeUser,
  className,
}: { className?: string } & ReturnType<typeof useUsers>) {
  const [dialogOpen, setDialogOpen] = useState(users.length === 0);
  const [files, setFiles] = useState<File[]>([]);

  const onChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files === null) return toast.error("no files");
    const files = Array.from(event.target.files);
    if (files.length === 0) return toast.error("No files");
    addUser({ name: files.at(0)?.name.split(".").at(0) });
    setFiles(files);
  };

  const submit = async () => {
    await parseIcs();
    // decide if we need another user for the next file
    // files.at(1) because we have not yet removed the first file
    if (files.length > 1) addUser({ name: files.at(1)?.name.split(".").at(0) });
    if (files.length === 1) setDialogOpen(false);
    setFiles(files.slice(1));
  };

  const parseIcs = async () => {
    const content =
      (await files
        .at(0)
        ?.text()
        .catch(() => null)) || null;
    if (content === null) {
      toast.error("error while parsing file");
      throw Error("error while parsing file");
    }

    const events = parseIcsContent(content);
    const user = users.at(-1)!;
    updateUser({
      ...user,
      events,
    });
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={(state) => setDialogOpen(state)}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className={className}>
            <Upload className="size-6" />
          </Button>
        </DialogTrigger>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        >
          {files.length === 0 ? (
            <>
              <DialogHeader>
                <DialogTitle>Import ics file</DialogTitle>
              </DialogHeader>
              <label
                htmlFor="ics-file-input"
                className="grid place-items-center p-10 outline-dashed outline outline-zinc-400 dark:outline-zinc-700 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                drop a ics file here
              </label>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create user for "{files.at(0)!.name}"</DialogTitle>
                <DialogDescription>
                  You can change the name and color later
                </DialogDescription>
              </DialogHeader>

              <User user={users.at(-1)!} updateUser={updateUser} />

              <DialogFooter>
                <DialogClose
                  asChild
                  onClick={() => {
                    setFiles([]);
                    removeUser(users.at(-1)!.id);
                  }}
                >
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={submit}>
                  {files.length >= 1 ? "Next File" : "Save"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <input
        onChange={onChange}
        type="file"
        name="ics-file-input"
        id="ics-file-input"
        className="sr-only"
        multiple
      />
    </>
  );
}
