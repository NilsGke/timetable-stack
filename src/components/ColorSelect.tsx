import { colorNames, type Color } from "../helpers/colors";
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
  color: Color;
  updateColor: (newColor: Color) => void;
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
              <span className={`size-4 aspect-square rounded bg-${color}`} />
              {color.replace("palette-", "")}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>

      {/* ensure these classes end up in tailwind bundle */}
      <div className="hidden bg-palette-red" />
      <div className="hidden bg-palette-orange" />
      <div className="hidden bg-palette-yellow" />
      <div className="hidden bg-palette-green" />
      <div className="hidden bg-palette-cyan" />
      <div className="hidden bg-palette-blue" />
      <div className="hidden bg-palette-purple" />
      <div className="hidden bg-palette-pink" />
      <div className="hidden bg-palette-white" />
    </Select>
  );
}
