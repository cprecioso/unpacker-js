import { Unpacker } from "./core"

export const bigInt64BE: Unpacker<bigint> = (buf, begin) => ({
  bytes: 8,
  value: buf.readBigInt64BE(begin),
})
export const bigInt64LE: Unpacker<bigint> = (buf, begin) => ({
  bytes: 8,
  value: buf.readBigInt64LE(begin),
})
export const bigUInt64BE: Unpacker<bigint> = (buf, begin) => ({
  bytes: 8,
  value: buf.readBigUInt64BE(begin),
})
export const bigUInt64LE: Unpacker<bigint> = (buf, begin) => ({
  bytes: 8,
  value: buf.readBigUInt64LE(begin),
})
export const doubleBE: Unpacker<number> = (buf, begin) => ({
  bytes: 8,
  value: buf.readDoubleBE(begin),
})
export const doubleLE: Unpacker<number> = (buf, begin) => ({
  bytes: 8,
  value: buf.readDoubleLE(begin),
})
export const floatBE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readFloatBE(begin),
})
export const floatLE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readFloatLE(begin),
})
export const int16BE: Unpacker<number> = (buf, begin) => ({
  bytes: 2,
  value: buf.readInt16BE(begin),
})
export const int16LE: Unpacker<number> = (buf, begin) => ({
  bytes: 2,
  value: buf.readInt16LE(begin),
})
export const int32BE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readInt32BE(begin),
})
export const int32LE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readInt32LE(begin),
})
export const int8: Unpacker<number> = (buf, begin) => ({
  bytes: 1,
  value: buf.readInt8(begin),
})
export const uInt16BE: Unpacker<number> = (buf, begin) => ({
  bytes: 2,
  value: buf.readUInt16BE(begin),
})
export const uInt16LE: Unpacker<number> = (buf, begin) => ({
  bytes: 2,
  value: buf.readUInt16LE(begin),
})
export const uInt32BE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readUInt32BE(begin),
})
export const uInt32LE: Unpacker<number> = (buf, begin) => ({
  bytes: 4,
  value: buf.readUInt32LE(begin),
})
export const uInt8: Unpacker<number> = (buf, begin) => ({
  bytes: 1,
  value: buf.readUInt8(begin),
})
