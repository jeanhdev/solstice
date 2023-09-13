import { Menu, Transition } from "@headlessui/react";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import {
  DatePickerStateProvider,
  useContextCalendars,
  useContextDaysPropGetters,
  useContextMonthsPropGetters,
  type CalendarDay,
  type CalendarMonth,
  type Calendar as CalendarType,
  type CalendarYear,
} from "@rehookify/datepicker";
import clsx from "clsx";
import { format, isDate, parseISO } from "date-fns";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

import { ButtonSecondary } from "@nebula/ui/components/Button";
import { usePerformanceStore } from "@nebula/stores/performance";

import "./DatePicker.module.css";

export default function DatePicker() {
  const now = new Date();
  const M = now.getMonth();
  const Y = now.getFullYear();
  const D = now.getDate();

  const { selectedDateRange, setSelectedDateRange } = usePerformanceStore();

  const [tempSelectedDateRange, setTempSelectedDateRange] = useState<Date[]>([
    parseISO(selectedDateRange.startDate),
    parseISO(selectedDateRange.endDate),
  ]);

  const onDatesChange = (dates: Date[]) => {
    setTempSelectedDateRange(dates);
    if (!!dates[0] && !!dates[1]) {
      setSelectedDateRange({
        startDate: dates[0].toISOString(),
        endDate: dates[1].toISOString(),
      });
    }
  };

  return (
    <DatePickerStateProvider
      config={{
        selectedDates: tempSelectedDateRange,
        onDatesChange,
        dates: {
          mode: "range",
          minDate: new Date(Y, M - 12, 1),
          maxDate: new Date(Y, M, D),
        },
        calendar: {
          offsets: [-12, 1],
        },
      }}
    >
      <SubDatePicker tempSelectedDateRange={tempSelectedDateRange} />
    </DatePickerStateProvider>
  );
}

const useFormattedDateRange = ({
  start,
  end,
}: {
  start: Date | undefined;
  end: Date | undefined;
}) => {
  return {
    start: isDate(start) ? format(start as Date, "dd/MM/yyyy") : "",
    end: isDate(end) ? format(end as Date, "dd/MM/yyyy") : "",
  };
};

const SubDatePicker = ({
  tempSelectedDateRange,
}: {
  tempSelectedDateRange: Date[] | undefined;
}) => {
  const { previousMonthButton, nextMonthButton } =
    useContextMonthsPropGetters();

  const { calendars } = useContextCalendars();

  const { start, end } = useFormattedDateRange({
    start: tempSelectedDateRange?.[0],
    end: tempSelectedDateRange?.[1],
  });

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Menu as="div" className="relative z-50 min-w-[217px]">
      <div>
        <Menu.Button
          as={ButtonSecondary}
          fullWidth
          size="compact"
          label={
            <span className={clsx(!!start ? "!text-center" : "!text-left")}>
              {!start && !end ? (
                ""
              ) : (
                <>
                  {start ? start : ""}&nbsp; - &nbsp;{end ? end : ""}
                </>
              )}
            </span>
          }
          icon={
            <CalendarDaysIcon className="h-5 w-5 text-[rgba(255,140,63,.98)]" />
          }
        />
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            ref={menuRef}
            className="absolute right-0 z-[100] mt-2 block w-72 origin-top-right rounded-6 border border-interactive-outline-secondary-enabled bg-[#21262f] p-2 text-interactive-fill-secondary-on-enabled"
          >
            <Calendar
              prevButton={
                <Button className="w-8" {...previousMonthButton()}>
                  <ChevronLeftIcon className="h-4 w-4 text-content-weak" />
                </Button>
              }
              nextButton={
                <Button className="w-8" {...nextMonthButton()}>
                  <ChevronRightIcon className="h-4 w-4 text-content-weak" />
                </Button>
              }
              calendar={calendars[0] as CalendarType}
            />
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

interface CalendarProps {
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  calendar: CalendarType;
}

export const Calendar: FC<CalendarProps> = ({
  prevButton,
  nextButton,
  calendar,
}) => {
  const { weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { days, month, year } = calendar;
  return (
    <Section>
      <SectionHeader>
        {prevButton || <div />}
        <p className="label-default-strong text-center text-xs">
          {month} {year}
        </p>
        {nextButton || <div />}
      </SectionHeader>
      <div className="mb-2 grid h-8 grid-cols-7 items-center gap-y-2">
        {weekDays.map((d) => (
          <p
            key={d}
            className="text-center font-suisse-mono text-xs text-content-moderate"
          >
            {d}
          </p>
        ))}
      </div>
      <main className="grid grid-cols-7 gap-y-2">
        {days.map((d) => (
          <Button
            key={d.$date.toString()}
            className={getDayClassName("w-full", d)}
            {...dayButton(d)}
          >
            {d.day}
          </Button>
        ))}
      </main>
    </Section>
  );
};

interface ButtonProps {
  className?: string;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  const buttonClassName = clsx(
    className?.includes("range-start") && "rounded-l-6",
    className?.includes("range-end") && "rounded-r-6",
    "h-8 flex justify-center shadow-none label-mini-strong items-center disabled:opacity-50 disabled:cursor-not-allowed",
    className?.includes("in-range") ||
      className?.includes("range-start") ||
      className?.includes("range-end")
      ? "p-2 bg-interactive-fill-secondary-pressed"
      : "hover:bg-interactive-fill-secondary-hover hover:rounded-6",
    className,
  );
  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export const getDayClassName = (
  className: string,
  { selected, disabled, inCurrentMonth, now, range }: CalendarDay,
) =>
  clsx("day", className, range, {
    "bg-interactive-fill-secondary-pressed": selected,
    "opacity-25 cursor-not-allowed": disabled,
    "!opacity-25": !inCurrentMonth,
    // 'border border-slate-500': now,
  });

export const getMonthClassName = (
  className: string,
  { selected, now, disabled }: CalendarMonth,
) =>
  clsx(className, {
    "bg-slate-700 text-white hover:bg-slate-700 opacity-100": selected,
    "border border-slate-500": now,
    "opacity-25 cursor-not-allowed": disabled,
  });

export const getYearsClassName = (
  className: string,
  { selected, now, disabled }: CalendarYear,
) =>
  clsx(className, {
    "bg-slate-700 text-white hover:bg-slate-700 opacity-100": selected,
    "border border-slate-500": now,
    "opacity-25 cursor-not-allowed": disabled,
  });

interface SectionProps {
  className?: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ className, children }) => {
  const sectionClassName = clsx("w-full", className);
  return <section className={sectionClassName}>{children}</section>;
};

interface SectionHeaderProps {
  className?: string;
  children?: ReactNode;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  className,
  children,
}) => {
  const headerClassName = clsx(
    "grid grid-cols-date-picker-header items-center mb-2",
    className,
  );
  return <header className={headerClassName}>{children}</header>;
};
