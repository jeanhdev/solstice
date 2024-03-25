import { Channel } from "@solstice/cosmos/tables/channels";
import { addDays, format, startOfDay, subDays } from "date-fns";
import { isNull } from "lodash";
import { z } from "zod";

import { type NavigationGroupLinks } from "@nebula/types";

export function getRandomDateTime(): string {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  return format(randomDate, "dd/MM/yyyy HH:mm");
}

export function getYesterdayDateTime(): string {
  const yesterday = addDays(new Date(), -1);
  return format(yesterday, "dd/MM/yyyy HH:mm");
}

export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getRandomRoas() {
  return +(Math.random() * 2 + 2).toFixed(2);
}

export function isRegex(input: string) {
  try {
    new RegExp(input);
    return true;
  } catch {
    return false;
  }
}

export function getLastWeekRange() {
  const endDate = startOfDay(new Date());
  const startDate = startOfDay(subDays(endDate, 6));
  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

const DateArraySchema = z.array(z.date());

export function isDateArray(arr: unknown[]) {
  console.log("arr entering parsing...", arr);
  const { success } = DateArraySchema.safeParse(arr);
  console.log(success);
  return success;
}

export function createNavigationFromChannels({
  channels,
  groupActionIcon,
}: {
  channels: Channel[];
  groupActionIcon?: JSX.Element;
}): {
  navigationGroup: NavigationGroupLinks;
} {
  if (!channels.length) {
    return {
      navigationGroup: {
        groupName: "Channels",
        groupActionIcon,
        links: [],
      },
    };
  }

  return {
    navigationGroup: {
      groupName: "Channels",
      groupActionIcon,
      links: channels.map((channel) => ({
        name: channel.name,
        key: channel.name,
        href: `/channels/${channel.slug}`,
      })),
    },
  };
}

export function kpiCurrencySumFormatted(
  input: (number | string | null)[] | [],
  currency?: string,
): string {
  if (input.length === 0) {
    return "-";
  }

  const parsedInput = input
    .filter((i) => !isNull(i))
    .map((val) => parseFloat(val as string))
    .filter((val) => !isNaN(val));

  if (parsedInput.length === 0) {
    return "-";
  }

  const sum = parsedInput.reduce((acc, cur) => acc + cur, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  try {
    const formattedSum = formatter.format(sum);
    return formattedSum;
  } catch (err) {
    return "-";
  }
}

export function kpiSumFormatted(
  input: (number | string | null)[] | [],
): string {
  if (input.length === 0) {
    return "-";
  }

  const parsedInput = input
    .map((val) => parseFloat(val as string))
    .filter((val) => !isNaN(val));

  if (parsedInput.length === 0) {
    return "-";
  }

  const sum = parsedInput.reduce((acc, cur) => acc + cur, 0);

  return sum.toLocaleString();
}

export function kpiAverageFormatted(numbers: (number | string)[] | []): string {
  if (numbers.length === 0) {
    return "-";
  }

  const parsedNumbers = numbers
    .map((num) => parseFloat(num as string))
    .filter((num) => !isNaN(num));

  if (parsedNumbers.length === 0) {
    return "-";
  }

  try {
    const sum = parsedNumbers.reduce((acc, cur) => acc + cur, 0);
    const average = sum / parsedNumbers.length;
    const formattedAverage = +average.toFixed(2);
    return formattedAverage.toString();
  } catch (err) {
    return "-";
  }
}

export function kpiCurrencyFormatted(
  input: number | string | null,
  currency?: string,
): string {
  if (!input) return "-";
  const parsedInput = parseFloat(input as string);
  if (isNaN(parsedInput)) {
    return "-";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  try {
    const formattedSum = formatter.format(parsedInput);
    return formattedSum;
  } catch (err) {
    return "-";
  }
}
