import { compare, genSalt, hash as _hash } from 'bcrypt'

export const hash = async (value: string) => {
  const salt = await genSalt()
  const result = await _hash(value, salt)

  return result
}

export const isHashMatch = (value: string, hash: string) => {
  return compare(value, hash)
}
