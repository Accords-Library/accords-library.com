import { isUndefined } from "./others";
import { DatePickerFragment } from "graphql/generated";

export const compareDate = (
  a: DatePickerFragment | null | undefined,
  b: DatePickerFragment | null | undefined
): number => {
  if (isUndefined(a) || isUndefined(b)) {
    return 0;
  }
  const dateA = (a.year ?? Infinity) * 365 + (a.month ?? 12) * 31 + (a.day ?? 31);
  const dateB = (b.year ?? Infinity) * 365 + (b.month ?? 12) * 31 + (b.day ?? 31);
  return dateA - dateB;
};

export const datePickerToDate = (date: DatePickerFragment): Date =>
  new Date(date.year ?? 0, date.month ? date.month - 1 : 0, date.day ?? 1);
