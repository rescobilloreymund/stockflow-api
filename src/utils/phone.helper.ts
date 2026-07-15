import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  CountryCode,
} from "../constants/phone.constants";

interface ParsedPhoneNumber {
  countryCode: string;
  localNumber: string;
}

export function parsePhoneNumber(phone: string): ParsedPhoneNumber {
  const countryCode =
    COUNTRY_CODES.find((c) => phone.startsWith(c.code)) ?? DEFAULT_COUNTRY;

  const localNumber = phone.replace(countryCode.code, "");

  return {
    countryCode: countryCode.code,
    localNumber,
  };
}

export function buildPhoneNumber(parsedPhone: ParsedPhoneNumber): string {
  console.log(
    "buildPhoneNumber ->",
    `${parsedPhone.countryCode}${parsedPhone.localNumber}`,
  );
  return `${parsedPhone.countryCode}${parsedPhone.localNumber}`;
}
