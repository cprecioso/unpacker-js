import { unpack, Unpacker, Unpacking } from "./core"

export const array = <T>(
  innerUnpacker: Unpacker<T>,
  times = Infinity
): Unpacker<readonly T[]> => (buf, begin) => {
  const outerUnpacking: Unpacking<T[]> = { bytes: 0, value: [] }

  const tryDecode = () => {
    const innerUnpacking = unpack(
      innerUnpacker,
      buf,
      begin + outerUnpacking.bytes
    )
    outerUnpacking.bytes += innerUnpacking.bytes
    outerUnpacking.value.push(innerUnpacking.value)
  }

  if (times === Infinity) {
    try {
      while (true) tryDecode()
    } catch {}
  } else {
    for (let i = 0; i < times; i++) {
      tryDecode()
    }
  }

  return outerUnpacking
}

export const times = <T>(
  n: number,
  innerUnpacker: Unpacker<T>
): Unpacker<readonly T[]> => array(innerUnpacker, n)
