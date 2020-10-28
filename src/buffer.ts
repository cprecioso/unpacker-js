import { Unpacker } from "./core"

export const raw = (bytes: number): Unpacker<Buffer> => (buf, begin) => ({
  bytes,
  value: buf.slice(begin, begin + bytes),
})
