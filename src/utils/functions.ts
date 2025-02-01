import { Database } from "@src/utils/database.types.ts";
import { DateTime, Interval } from "luxon";
import { sortBy, unzip, zip } from "lodash";
import { TooltipItem } from "chart.js";

export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function updateArray<T extends { id?: number }>(startingArray: T[], newObjects: T[]) {
  // Create a map for quick lookup of existing IDs in the starting array
  const startingMap = new Map(startingArray.map((obj) => [obj.id, obj]));

  // Process the new objects
  newObjects.forEach((newObj) => {
    if (startingMap.has(newObj.id)) {
      // If the ID exists, override the existing object
      Object.assign(startingMap.get(newObj.id)!, newObj);
    } else {
      // If the ID doesn't exist, append the new object
      startingArray.push(newObj);
    }
  });

  return startingArray;
}

export function downloadFile(content: string, name: string, type: string = "text/plain") {
  const element = document.createElement("a");
  const file = new Blob([content], { type });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
}

export function containsAll<T>(array: T[], values: T[]) {
  return values.every((value) => array.includes(value));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit" });
}

export function getSumByMonth(
  collection: Database["public"]["Functions"]["get_amount_by_category_and_date"]["Returns"],
  dateStart: DateTime<true>,
  dateEnd: DateTime<true>,
): number[] {
  const sums = Object.fromEntries(
    Interval.fromDateTimes(dateStart, dateEnd)
      .splitBy({ month: 1 })
      .map((interval) => interval.start!)
      .map((month) => [month.toSQLDate(), 0]),
  );
  collection?.forEach((element) => {
    sums[element.month.split(" ")[0]] += element.sum;
  });
  return Object.values(sums);
}

export function sortChartData(labels: string[], data: number[]) {
  const arrays = sortBy(zip(labels, data), (item) => item[1]).reverse();
  return unzip(arrays);
}

export const currencyFormat = (options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat("pl", { style: "currency", currency: "PLN", ...options });

export const labelCallback = (context: TooltipItem<"line" | "pie">) => {
  let label = context.dataset.label || "";

  if (label) {
    label += ": ";
  }
  if (typeof context.parsed === "number") {
    label += currencyFormat().format(context.parsed);
  }
  if (context.parsed.y) {
    label += currencyFormat().format(context.parsed.y);
  }
  return label;
};
