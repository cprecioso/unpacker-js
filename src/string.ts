import { isUnpacker, Unpacker } from "./core"
import { after } from "./util"

const staticLengthString = (
  bytes: number | undefined,
  encoding: BufferEncoding
): Unpacker<string> => (buf, begin) => {
  const value = buf.toString(
    encoding,
    begin,
    bytes != null ? begin + bytes : undefined
  )
  bytes ??= Buffer.byteLength(value, encoding)
  return { bytes, value }
}

const dynamicLengthString = (
  numberUnpacker: Unpacker<number>,
  encoding: BufferEncoding
): Unpacker<string> =>
  after(numberUnpacker, ({ value: n }) => staticLengthString(n, encoding))

export const string = (
  length?: number | Unpacker<number>,
  encoding: BufferEncoding = "utf-8"
): Unpacker<string> =>
  isUnpacker(length)
    ? dynamicLengthString(length, encoding)
    : staticLengthString(length, encoding)

export const ascii = (length?: number | Unpacker<number>) =>
  string(length, "ascii")
export const utf8 = (length?: number | Unpacker<number>) =>
  string(length, "utf-8")
