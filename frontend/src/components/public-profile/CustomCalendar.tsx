import { useState, type JSX } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  availableDates: string[];
  unavailableDates: string[];
  unlimitedDates: string[];
}

export default function Calendar({
  availableDates,
  unavailableDates,
  unlimitedDates,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const monthStart = currentDate.startOf("month");
  const monthEnd = currentDate.endOf("month");
  const startDate = monthStart.startOf("week");
  const endDate = monthEnd.endOf("week");
  const today = dayjs().format("YYYY-MM-DD");

  const getColor = (date: string) => {
    if (date === today) return "bg-[#5D7DBC]"; // highlight today
    if (unavailableDates.includes(date)) return "bg-[#C53D41] text-[#B89EA3]";
    if (unlimitedDates.includes(date)) return "bg-[#C09A10]";
    if (availableDates.includes(date)) return "bg-[#23A758]";
  };
  // Generate calendar rows
  const rows: JSX.Element[] = [];
  let day = startDate;
  let days: JSX.Element[] = [];

  while (day.isBefore(endDate, "day")) {
    for (let i = 0; i < 7; i++) {
      const formatted = day.format("YYYY-MM-DD");
      const isCurrentMonth = day.month() === currentDate.month();
      const color = isCurrentMonth ? getColor(formatted) : "text-gray-600";

      days.push(
        <div
          key={formatted}
          className={`font-[400] text-[14px] flex items-center justify-center w-[36px] h-[36px] p-[10px] rounded-[12px] m-1 ${color} `}
        >
          {day.date()}
        </div>
      );
      day = day.add(1, "day");
    }
    rows.push(
      <div key={day.toString()} className="flex gap-2 justify-betwen">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className=" w-full bg-[#2C303B] text-white p-4 rounded-lg ">
      {/* Header */}
      <div className="flex items-center justify-center gap-[64px] mb-[32px]">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="transition-all rounded-lg cursor-pointer hover:opacity-80 hover:bg-gray-600"
        >
          <ChevronLeft className="text-[#7A7E89] transition-all " />
        </button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="transition-all rounded-lg cursor-pointer hover:opacity-80 hover:bg-gray-600"
        >
          <ChevronRight className="text-[#7A7E89] transition-all " />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-[14px] text-center text-[16px] font-[500]">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Calendar */}
      {rows}
    </div>
  );
}
