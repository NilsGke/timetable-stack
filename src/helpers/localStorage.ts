import { userSchema } from "@/helpers/app.types";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  users: z.array(userSchema),
});

const KEY = "timetable-stack-data";

const defaultData = { users: [] } satisfies z.infer<typeof schema>;

export const getData = () => {
  const stringData = localStorage.getItem(KEY);
  if (stringData === null) {
    setData(defaultData);
    return defaultData;
  }
  const parsedData = JSON.parse(stringData);
  const result = schema.safeParse(parsedData);
  if (result.success) return result.data;

  toast.error("error while parsing old data.\n" + result.error.message);
  return defaultData;
};

export const setData = (data: z.infer<typeof schema>) =>
  localStorage.setItem(KEY, JSON.stringify(data));
