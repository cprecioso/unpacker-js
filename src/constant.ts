import { Unpacker } from "./core"

export const constant = <T>(value: T): Unpacker<T> => () => ({
  bytes: 0,
  value,
})
