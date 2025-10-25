import { Button } from "./ui/button";
import type { useModules } from "@/hooks/useModules";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Module } from "./Module";

export function Modules({
  modules,
  addModule,
  updateModule,
  removeModule,
}: ReturnType<typeof useModules>) {
  const [parent] = useAutoAnimate();

  return (
    <div className="p-8 pb-0 h-full gap-8 max-h-full grid grid-rows-[auto_1fr]">
      <h2 className="text-2xl text-center">Modules</h2>
      <div
        ref={parent}
        className="max-h-full size-full flex gap-4 flex-col overflow-y-scroll"
      >
        {modules.map((module) => (
          <Module
            key={module.id}
            module={module}
            updateModule={updateModule}
            removeModule={() => removeModule(module.id)}
          />
        ))}

        <Button onClick={addModule} variant="outline" className="mb-4">
          +
        </Button>
      </div>
    </div>
  );
}
