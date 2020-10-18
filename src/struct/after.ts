import { unpack, Unpacker, Unpacking } from "../core"

export const afterStruct = <T extends {}, K extends string, V>(
  innerUnpacker: Unpacker<T>,
  name: K,
  afterFn: (unpacking: Unpacking<T>) => Unpacker<V>
): Unpacker<T & { [_ in K]: V }> => (buf, begin) => {
  const innerUnpacking = unpack(innerUnpacker, buf, begin)
  const afterUnpacking = unpack(
    afterFn(innerUnpacking),
    buf,
    begin + innerUnpacking.bytes
  )

  return {
    bytes: innerUnpacking.bytes + afterUnpacking.bytes,
    value: { ...innerUnpacking.value, [name]: afterUnpacking.value } as T &
      { [_ in K]: V },
  }
}

export const afterCheckStruct = <T extends {}>(
  innerUnpacker: Unpacker<T>,
  afterFn: (unpacking: Unpacking<T>) => Unpacker<any>
): Unpacker<T> => (buf, begin) => {
  const innerUnpacking = unpack(innerUnpacker, buf, begin)
  const afterUnpacking = unpack(
    afterFn(innerUnpacking),
    buf,
    begin + innerUnpacking.bytes
  )

  return {
    bytes: innerUnpacking.bytes + afterUnpacking.bytes,
    value: innerUnpacking.value,
  }
}
