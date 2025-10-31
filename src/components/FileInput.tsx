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
}: ReturnType<typeof useUsers>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files === null) return toast.error("no files");
    const files = Array.from(event.target.files);
    if (files.length === 0) return toast.error("No files");
    addUser();
    setFiles(files);

    // const content = await file.text().catch(() => null);
    // if (content === null) return toast.error("error while parsing file");
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
    console.log(events);
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
          <Button variant="outline" size="icon">
            <Upload />
          </Button>
        </DialogTrigger>
        <DialogContent>
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
                <Button
                  type="submit"
                  onClick={async () => {
                    await parseIcs();
                    if (files.length > 1) addUser();
                    if (files.length === 1) setDialogOpen(false);
                    setFiles(files.slice(1));
                  }}
                >
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
