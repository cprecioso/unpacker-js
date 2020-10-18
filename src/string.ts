import { Unpacker } from "./core"

export const string = (
  bytes?: number,
  encoding: BufferEncoding = "utf-8"
): Unpacker<string> => (buf, begin) => {
  const value = buf.toString(
    encoding,
    begin,
    bytes != null ? begin + bytes : undefined
  )
  bytes ??= Buffer.byteLength(value, encoding)
  return { bytes, value }
}

export const ascii = (bytes?: number) => string(bytes, "ascii")
export const utf8 = (bytes?: number) => string(bytes, "utf-8")
