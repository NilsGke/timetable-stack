import { ThemeProvider } from "./components/ThemeProvider";
import { Users } from "./components/Users";
import { useUsers } from "./hooks/useUsers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useModules } from "./hooks/useModules";
import { Modules } from "./components/Modules";
import { useEffect } from "react";
import { setData } from "./helpers/localStorage";
import { TimeTable } from "./components/TimeTable";
import { ButtonBar } from "./components/ButtonBar";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { users, addUser, updateUser, removeUser } = useUsers();
  const { modules, addModule, updateModule, removeModule } = useModules();

  // store data on every update
  useEffect(() => setData({ users, modules }), [users, modules]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="timetable-stack-theme">
      <div className="size-full relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={40} minSize={10}>
                <Users
                  users={users}
                  updateUser={updateUser}
                  addUser={addUser}
                  removeUser={removeUser}
                />
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel minSize={10}>
                <Modules
                  modules={modules}
                  addModule={addModule}
                  updateModule={updateModule}
                  removeModule={removeModule}
                />
              </ResizablePanel>
              <ButtonBar
                users={users}
                addUser={addUser}
                updateUser={updateUser}
                removeUser={removeUser}
              />
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel minSize={50}>
            <TimeTable users={users} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
