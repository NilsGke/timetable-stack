import { ThemeProvider } from "./components/ThemeProvider";
import { DarkModeToggle } from "./components/DarkModeToggle";
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

function App() {
  const { users, addUser, updateUser, removeUser } = useUsers();
  const { modules, addModule, updateModule, removeModule } = useModules();

  // store data on every update
  useEffect(() => setData({ users, modules }), [users, modules]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="size-full relative">
        <DarkModeToggle className="top-4 right-4 absolute" />
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
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel minSize={50}>
            <TimeTable />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  );
}

export default App;
