import { hashSync, compareSync } from "bcrypt";

export const hash = (data: string) => {
  return hashSync(data, 10)
}

export const compare = (data: string, hashed: string) => {
  return compareSync(data, hashed)
}