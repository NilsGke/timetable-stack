import { User } from "@/components/User";
import type { useUsers } from "@/hooks/useUsers";
import { Reorder } from "motion/react";

export function Users({
  users,
  updateUser,
  removeUser,
  reorderUsers,
}: ReturnType<typeof useUsers>) {
  return (
    <div className="p-8 pb-0 grid-rows-[auto_1fr] h-full gap-8 grid">
      <h2 className="text-2xl text-center">Users</h2>
      <Reorder.Group
        className="flex min-w-[375px] flex-col gap-4 overflow-y-auto max-h-full"
        axis="y"
        values={users}
        onReorder={reorderUsers}
        as="div"
      >
        {users.map((user) => (
          <User
            reordable={true}
            key={user.id}
            user={user}
            updateUser={updateUser}
            removeUser={() => removeUser(user.id)}
          />
        ))}
      </Reorder.Group>
      {users.length === 0 && (
        <span className="text-zinc-400 dark:text-zinc-600">no users</span>
      )}
    </div>
  );
}
