import { Unpacker, Unpacking } from "./core"

export const boolean: Unpacker<boolean> = (buf, begin) => ({
  bytes: 1,
  value: buf[begin] === 0x00,
})

export const flags = <T extends string>(
  flagNames: readonly T[]
): Unpacker<{ [_ in T]: boolean }> => (buf, begin) => {
  const unpacking = { bytes: 0, value: {} as Partial<Record<T, boolean>> }

  for (const flagName of flagNames) {
    unpacking.value[flagName] = buf[begin + unpacking.bytes] !== 0x0
  }

  return unpacking as Unpacking<Record<T, boolean>>
}
