import { useState } from "react";
import type { ModuleType } from "../helpers/app.types";
import { getData } from "@/helpers/localStorage";

export const useModules = () => {
  const [modules, setModules] = useState<ModuleType[]>(getData().modules);

  const updateModule = (newModule: ModuleType) => {
    const index = modules.findIndex(({ id }) => id === newModule.id);
    if (index === -1)
      throw Error("could not find module with id: " + newModule.id);
    const newModules = modules.slice();
    newModules[index] = newModule;
    setModules(newModules);
  };

  const addModule = () =>
    setModules([
      ...modules,
      {
        id: crypto.randomUUID(),
        name: "",
        shortName: "",
      },
    ]);

  const removeModule = (id: ModuleType["id"]) =>
    setModules(modules.filter((module) => module.id !== id));

  return { modules, updateModule, addModule, removeModule };
};
