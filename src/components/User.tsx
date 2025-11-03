import type { UserType } from "../helpers/app.types";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ColorSelect from "./ColorSelect";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

export const User = ({
  user,
  updateUser,
  removeUser,
}: {
  user: UserType;
  updateUser: (user: UserType) => void;
  removeUser?: () => void;
}) => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid grid-cols-[1fr_auto_auto] gap-6">
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
  );
};
