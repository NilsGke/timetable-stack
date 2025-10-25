import { ThemeProvider } from "./components/ThemeProvider";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { Users } from "./components/Users";
import { useUsers } from "./hooks/useUsers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function App() {
  const { users, addUser, updateUser, removeUser } = useUsers();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="size-full relative">
        <DarkModeToggle className="top-4 right-4 absolute" />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="m-8">
              <Users
                users={users}
                updateUser={updateUser}
                addUser={addUser}
                removeUser={removeUser}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel minSize={50}>
            <div className="m-8">TIMETABLE</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  );
}

export default App;
