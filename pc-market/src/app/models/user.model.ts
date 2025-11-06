export interface User {
  id: number,
  username: string,
  dob: string,
  first_name: string,
  last_name: string,
  password_hash?: string,
  account_created: string,
  address_1: string,
  address_2?: string,
  state_code: string,
  zip_code: string,
  country_code: string
}
