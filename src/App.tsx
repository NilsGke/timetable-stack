import { ThemeProvider } from "./components/ThemeProvider";
import { Users } from "./components/Users";
import { useUsers } from "./hooks/useUsers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef } from "react";
import { setData } from "./helpers/localStorage";
import { TimeTable } from "./components/TimeTable";
import { ButtonBar } from "./components/ButtonBar";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { users, addUser, updateUser, removeUser, reorderUsers } = useUsers();

  // store data on every update
  useEffect(() => setData({ users }), [users]);
  // time table ref to pass to the screenshot button
  const timetableRef = useRef<HTMLDivElement | null>(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="timetable-stack-theme">
      <div className="size-full relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <ResizablePanelGroup direction="vertical">
              <Users
                users={users}
                updateUser={updateUser}
                addUser={addUser}
                removeUser={removeUser}
                reorderUsers={reorderUsers}
              />

              <ButtonBar
                users={users}
                addUser={addUser}
                updateUser={updateUser}
                removeUser={removeUser}
                reorderUsers={reorderUsers}
                timetableRef={timetableRef}
              />
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel minSize={50}>
            <TimeTable users={users} ref={timetableRef} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
