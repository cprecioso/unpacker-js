export interface Unpacking<T> {
  bytes: number
  value: T
}

export type UnpackerFunction<T> = (
  buffer: Buffer,
  begin: number
) => Unpacking<T>

export const unpackerSymbol = /** #__PURE__ */ Symbol("unpacker")
export interface UnpackerObject<T> {
  [unpackerSymbol]: UnpackerFunction<T>
}
const isUnpackerObject = (v: any): v is UnpackerObject<any> =>
  v[unpackerSymbol] && typeof v[unpackerSymbol] === "function"

export type Unpacker<T> = UnpackerFunction<T> | UnpackerObject<T>

export const unpack = <T>(
  unpacker: Unpacker<T>,
  buffer: Buffer,
  begin = 0
): Unpacking<T> =>
  isUnpackerObject(unpacker)
    ? unpacker[unpackerSymbol](buffer, begin)
    : unpacker(buffer, begin)
