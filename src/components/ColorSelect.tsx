import { colorMap, colorNames } from "../helpers/colors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ColorSelect({
  color,
  updateColor,
}: {
  color: keyof typeof colorMap;
  updateColor: (newColor: keyof typeof colorMap) => void;
}) {
  return (
    <Select value={color} onValueChange={updateColor}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colors</SelectLabel>
          {colorNames.map((color) => (
            <SelectItem value={color} key={color}>
              <span
                style={{ backgroundColor: colorMap[color] }}
                className="size-4 rounded"
              />
              {color}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
