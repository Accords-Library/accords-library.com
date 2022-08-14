import { GetCurrenciesQuery, PricePickerFragment } from "graphql/generated";

export const convertPrice = (
  pricePicker: PricePickerFragment,
  targetCurrency: NonNullable<GetCurrenciesQuery["currencies"]>["data"][number]
): number => {
  if (
    pricePicker.amount &&
    pricePicker.currency?.data?.attributes &&
    targetCurrency.attributes
  )
    return (
      (pricePicker.amount * pricePicker.currency.data.attributes.rate_to_usd) /
      targetCurrency.attributes.rate_to_usd
    );
  return 0;
};

export const convertMmToInch = (mm: number | null | undefined): string =>
  mm ? (mm * 0.03937008).toPrecision(3) : "";

export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const isInteger = (value: string): boolean =>
  /^[+-]?[0-9]+$/u.test(value);

export const clamp = (
  value: number,
  minValue: number,
  maxValue: number
): number => {
  if (value > maxValue) return maxValue;
  if (value < minValue) return minValue;
  return value;
};
