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

export const convertMmToInch = (mm: number | null | undefined): string => {
  return mm ? (mm * 0.03937008).toPrecision(3) : "";
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isInteger = (value: string): boolean => {
  // eslint-disable-next-line require-unicode-regexp
  return /^[+-]?[0-9]+$/.test(value);
};
