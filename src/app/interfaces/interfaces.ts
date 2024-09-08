export interface AvailableCountry {
  countryCode: string;
  name: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: any;
  launchYear: any;
  type: string;
}
