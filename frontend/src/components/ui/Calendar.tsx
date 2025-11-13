// Calendar.tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarProps {
  onDateSelect?: (date: Date) => void; // 👈 callback prop
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = React.useState<number | null>(
    today.getDate()
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    const fullDate = new Date(currentYear, currentMonth, day); // 👈 get full date
    if (onDateSelect) {
      onDateSelect(fullDate); // 👈 send to parent
    }
  };

  return (
    <div className="rounded-2xl bg-[#2C303B] p-4 w-80 border border-[#7A7E89]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-white">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#2a3145] rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#2a3145] rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 mb-2 text-sm text-center text-gray-300">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center gap-y-2">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors 
                ${
                  selectedDate === day
                    ? "bg-[#5D7DBC] text-white"
                    : isToday
                    ? "border border-blue-500 text-white"
                    : "text-gray-300 hover:bg-[#2a3145]"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
