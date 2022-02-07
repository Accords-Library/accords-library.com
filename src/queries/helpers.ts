import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";

export function getAssetURL(url: string): string {
  return process.env.NEXT_PUBLIC_URL_CMS + url;
}

export function prettyDate(
  datePicker: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"]
): string {
  return (
    datePicker.year +
    "/" +
    datePicker.month.toString().padStart(2, "0") +
    "/" +
    datePicker.day.toString().padStart(2, "0")
  );
}

export function prettyPrice(
  pricePicker: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["price"]
): string {
  return (
    pricePicker.currency.data.attributes.symbol +
    pricePicker.amount.toLocaleString()
  );
}

export function prettySlug(slug: string, parentSlug?: string): string {
  if (parentSlug && slug.startsWith(parentSlug))
    slug = slug.substring(parentSlug.length + 1);
  let words = slug.split("-");
  words = words.map(
    (word) => (word = word.charAt(0).toUpperCase() + word.substring(1))
  );
  return words.join(" ");
}

export function convertMmToInch(mm: number): string {
  return (mm * 0.03937008).toPrecision(3);
}
