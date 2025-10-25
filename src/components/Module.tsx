import type { ModuleType } from "../types";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

export const Module = ({
  module,
  updateModule,
  removeModule,
}: {
  module: ModuleType;
  updateModule: (user: ModuleType) => void;
  removeModule: () => void;
}) => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid grid-cols-[1fr_auto_auto] gap-6">
          <Input
            className="min-w-42"
            type="text"
            placeholder="name"
            value={module.name}
            onChange={(event) => {
              updateModule({ ...module, name: event.target.value });
            }}
          />

          <Input
            type="text"
            placeholder="short name"
            value={module.shortName}
            onChange={(event) => {
              updateModule({ ...module, shortName: event.target.value });
            }}
          />
          <Button onClick={() => removeModule()} variant="outline">
            -
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
