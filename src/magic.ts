import { Unpacker } from "./core"

export const magic: {
  (str: string, encoding?: BufferEncoding): Unpacker<void>
  (array: number[]): Unpacker<void>
  (buffer: Buffer): Unpacker<void>
  (
    arrayBuffer: ArrayBuffer | SharedArrayBuffer,
    byteOffset?: number,
    length?: number
  ): Unpacker<void>
} = (...args: [any, ...any]): Unpacker<void> => {
  const magicBuf = Buffer.from(...args)
  const bytes = magicBuf.byteLength

  return (buf, begin) => {
    const result = buf.slice(begin, begin + bytes).equals(magicBuf)
    if (!result) throw new Error("Magic Buffer not found")
    return { bytes, value: void 0 }
  }
}
