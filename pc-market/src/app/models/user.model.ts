export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash?: string;
  dob: string;
  accountCreated: string;
  address1: string;
  address2?: string;
  stateCode: string;
  zipCode: string;
  countryCode: string;
}
