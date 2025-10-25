import { User } from "@/components/User";
import { Button } from "./ui/button";
import type { useUsers } from "@/hooks/useUsers";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Users({
  users,
  addUser,
  updateUser,
  removeUser,
}: ReturnType<typeof useUsers>) {
  const [parent] = useAutoAnimate();

  return (
    <>
      <h2>Users</h2>
      <div className="flex flex-col gap-4" ref={parent}>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            updateUser={updateUser}
            removeUser={() => removeUser(user.id)}
          />
        ))}

        <Button onClick={addUser} variant="outline">
          +
        </Button>
      </div>
    </>
  );
}
