import { constant } from "../constant"
import { Unpacker } from "../core"
import { StructUnpacker } from "./base"

export const struct: {
  (): StructUnpacker<{}>
  <T>(innerUnpacker: Unpacker<T>): StructUnpacker<T>
} = (innerUnpacker = constant({})) => new StructUnpacker(innerUnpacker)

export type { StructUnpacker } from "./base"
