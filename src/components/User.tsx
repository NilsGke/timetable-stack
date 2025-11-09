import type { UserType } from "../helpers/app.types";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ColorSelect from "./ColorSelect";
import { Button } from "./ui/button";
import { GripVertical, Trash2Icon } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";

export const User = ({
  user,
  updateUser,
  removeUser,
}: {
  user: UserType;
  updateUser: (user: UserType) => void;
  removeUser?: () => void;
}) => {
  const controls = useDragControls();
  return (
    <Reorder.Item
      key={user.id}
      value={user}
      dragControls={controls}
      as="div"
      dragListener={false}
    >
      <Card className="w-full">
        <CardContent>
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4">
            <div
              onPointerDown={(e) => controls.start(e)}
              className="grid  cursor-grab place-items-center"
            >
              <GripVertical
                size={18}
                className="text-zinc-400 dark:text-zinc-600"
              />
            </div>
            <Input
              type="text"
              placeholder="name"
              value={user.name}
              onChange={(event) => {
                updateUser({ ...user, name: event.target.value });
              }}
            />
            <ColorSelect
              color={user.color}
              updateColor={(color) => updateUser({ ...user, color })}
            />
            {removeUser && (
              <Button onClick={() => removeUser()} variant="outline">
                <Trash2Icon className="stroke-red-400" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
};
