import { unpack, Unpacker, Unpacking } from "./core"

export const skip = (bytes: number): Unpacker<void> => (buf, begin) => ({
  bytes,
  value: void 0,
})

export const pad = <T>(
  unpacker: Unpacker<T>,
  minBytes: number
): Unpacker<T> => (buf, begin) => {
  const { bytes, value } = unpack(unpacker, buf, begin)
  return { bytes: Math.max(bytes, minBytes), value }
}

export const map = <T, U>(
  unpacker: Unpacker<T>,
  mapFn: (unpacking: Unpacking<T>) => U
): Unpacker<U> => (buf, begin) => {
  const unpacking = unpack(unpacker, buf, begin)
  return { bytes: unpacking.bytes, value: mapFn(unpacking) }
}

export const after = <T, U>(
  innerUnpacker: Unpacker<T>,
  afterFn: (decoding: Unpacking<T>) => Unpacker<U>
): Unpacker<U> => (buf, begin) => {
  const innerUnpacking = unpack(innerUnpacker, buf, begin)
  const outerUnpacking = unpack(
    afterFn(innerUnpacking),
    buf,
    begin + innerUnpacking.bytes
  )

  return {
    bytes: innerUnpacking.bytes + outerUnpacking.bytes,
    value: outerUnpacking.value,
  }
}

export const optional = <T>(unpacker: Unpacker<T>): Unpacker<T | undefined> => (
  buf,
  begin
) => {
  try {
    return unpack(unpacker, buf, begin)
  } catch {
    return { bytes: 0, value: undefined }
  }
}
