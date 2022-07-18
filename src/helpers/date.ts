import { DatePickerFragment } from "graphql/generated";

export const compareDate = (
  a: DatePickerFragment,
  b: DatePickerFragment
): number => {
  const dateA = (a.year ?? 99999) * 365 + (a.month ?? 12) * 31 + (a.day ?? 31);
  const dateB = (b.year ?? 99999) * 365 + (b.month ?? 12) * 31 + (b.day ?? 31);
  return dateA - dateB;
};
