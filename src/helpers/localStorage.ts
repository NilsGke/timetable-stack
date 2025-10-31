import { moduleSchema, userSchema } from "@/helpers/app.types";
import { z } from "zod";

const schema = z.object({
  modules: z.array(moduleSchema),
  users: z.array(userSchema),
});

const KEY = "timetable-stack-data";

const defaultData = {
  modules: [],
  users: [],
} satisfies z.infer<typeof schema>;

export const getData = () => {
  const stringData = localStorage.getItem(KEY);
  if (stringData === null) {
    setData(defaultData);
    return defaultData;
  }
  const parsedData = JSON.parse(stringData);
  return schema.parse(parsedData);
};

export const setData = (data: z.infer<typeof schema>) =>
  localStorage.setItem(KEY, JSON.stringify(data));
