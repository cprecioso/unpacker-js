import { unpack, Unpacker, Unpacking } from "./core"

export type Entry<T extends {}> = { [P in keyof T]: [P, T[P]] }[keyof T]
export type ObjectWithUnpackers<T extends {}> = {
  [P in keyof T]: Unpacker<T[P]>
}
export const fields = <T extends {}, U extends {}>(
  innerUnpacker: Unpacker<T>,
  pairs: readonly (Entry<ObjectWithUnpackers<U>> | [null, Unpacker<any>])[]
): Unpacker<T & U> => (buf, begin) => {
  const unpacking: Unpacking<T & Partial<U>> = unpack(innerUnpacker, buf, begin)

  for (const [name, unpacker] of pairs) {
    const { bytes, value } = unpack(unpacker, buf, begin + unpacking.bytes)
    unpacking.bytes += bytes
    if (name != null) {
      unpacking.value[name] = value
    }
  }

  return unpacking as Unpacking<T & U>
}

export const field = <T extends {}, K extends string, V>(
  innerUnpacker: Unpacker<T>,
  name: K,
  fieldUnpacker: Unpacker<V>
): Unpacker<T & { [_ in K]: V }> =>
  fields<T, { [_ in K]: V }>(innerUnpacker, [[name, fieldUnpacker]])
