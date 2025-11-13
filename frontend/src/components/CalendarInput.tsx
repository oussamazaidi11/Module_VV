import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import Calendar from "./ui/Calendar";
interface Props {
  setdate: (value: string) => void;
}
export default function CalendarInput({ setdate }: Props) {
  const [date, setDate] = useState<string>("Pick a date");
  const handleDateSelect = (date: Date) => {
    setDate(date.toDateString());
    setdate(date.toDateString());
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative flex">
          <input
            className=" bg-[#17181D] text-white p-4 w-full rounded-lg "
            placeholder={date}
          />
          <img
            src="Calendar-range.svg"
            className="absolute -translate-y-1/2 right-3 top-1/2"
            alt=""
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-0 w-fit rounded-3xl h-fit">
        <Calendar onDateSelect={handleDateSelect} />
      </PopoverContent>
    </Popover>
  );
}
