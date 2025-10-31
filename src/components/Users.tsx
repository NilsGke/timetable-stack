import { User } from "@/components/User";
import type { useUsers } from "@/hooks/useUsers";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Users({
  users,
  updateUser,
  removeUser,
}: ReturnType<typeof useUsers>) {
  const [parent] = useAutoAnimate();

  return (
    <div className="p-8 pb-0 grid-rows-[auto_1fr] h-full gap-8 grid">
      <h2 className="text-2xl text-center">Users</h2>
      <div
        ref={parent}
        className="flex min-w-[375px] flex-col gap-4 overflow-y-scroll max-h-full"
      >
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            updateUser={updateUser}
            removeUser={() => removeUser(user.id)}
          />
        ))}
        {users.length === 0 && (
          <span className="text-zinc-400 dark:text-zinc-600">no users</span>
        )}
      </div>
    </div>
  );
}
