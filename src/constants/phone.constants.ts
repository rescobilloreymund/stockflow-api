export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

export const DEFAULT_COUNTRY: CountryCode = {
  code: "+63",
  country: "Philippines",
  flag: "🇵🇭",
};

export const COUNTRY_CODES: CountryCode[] = [
  DEFAULT_COUNTRY,
  {
    code: "+65",
    country: "Singapore",
    flag: "🇸🇬",
  },
  {
    code: "+60",
    country: "Malaysia",
    flag: "🇲🇾",
  },
];
