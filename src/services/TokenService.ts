import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const sign = (data: any) => {
  return jwt.sign(data, process.env.APP_SECRET as string)
}

const verify = (token: string): jwt.JwtPayload | false => {
  try {
    return jwt.verify(token, process.env.APP_SECRET as string) as jwt.JwtPayload
  } catch (error) {
    return false
  }
}

export {
  sign,
  verify
}