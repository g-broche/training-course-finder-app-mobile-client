import { decode } from "he";

export const formatStringTemplate = (
  template: string,
  params: Record<string, string | number>,
): string => {
  let finalString = template;
  for (const key in params) {
    finalString = finalString.replace(`:${key}`, String(params[key]));
  }
  return finalString;
};

export const decodeHtmlEntities = (value: string): string => {
  return decode(value);
};
