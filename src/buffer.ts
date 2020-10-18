import { Unpacker } from "./core"

export const buffer = (bytes: number): Unpacker<Buffer> => (buf, begin) => ({
  bytes,
  value: buf.slice(begin, begin + bytes),
})
