export type UserProfileType = {
  about: string;
  avatarimage: string;
  backgroundimage: string;
  createdat: string;
  id: number;
  name: string;
  socialmediaurl: string;
  updatedat: string;
  userid: number;
};

export type FormValuesType = {
  email: string;
  password: string;
};

export type UserType = {
  createdat: string;
  email: string;
  id: number;
  password: string;
  receiveddonation: number;
  updatedat: string;
  username: string;
};

export type DecodedTokenType = {
  user: { email: string; password: string; id: number };
};

export type DonationType = {
  amount: number;
  createdat: string;
  donorid: number;
  id: number;
  recipientid: number;
  socialurlorbuymeacoffee: string;
  specialmessage: string;
  updatedat: string;
};

export type CountryApiType = {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
};
