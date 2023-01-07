import { isDefined, isUndefined } from "./asserts";

type DatePickerFragment = {
  year?: number | null;
  month?: number | null;
  day?: number | null;
};

export const compareDate = (
  a: DatePickerFragment | null | undefined,
  b: DatePickerFragment | null | undefined
): number => {
  if (isUndefined(a) || isUndefined(b)) {
    return 0;
  }
  return dateInDays(a) - dateInDays(b);
};

const dateInDays = (date: DatePickerFragment | null | undefined): number =>
  isDefined(date) ? (date.year ?? Infinity) * 365 + (date.month ?? 12) * 31 + (date.day ?? 31) : 0;

export const datePickerToDate = (date: DatePickerFragment): Date =>
  new Date(date.year ?? 0, date.month ? date.month - 1 : 0, date.day ?? 1);
