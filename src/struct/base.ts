import {
  unpack,
  Unpacker,
  UnpackerObject,
  unpackerSymbol,
  Unpacking,
} from "../core"
import { afterCheckStruct, afterStruct } from "./after"
import { FieldStruct } from "./field"

export class StructUnpacker<T extends {}> implements UnpackerObject<T> {
  constructor(protected readonly _wrappedUnpacker: Unpacker<T>) {}

  protected _field(name: null, unpacker: Unpacker<any>): StructUnpacker<T>
  protected _field<K extends string, V>(
    name: K,
    unpacker: Unpacker<V>
  ): StructUnpacker<T & { [_ in K]: V }>
  protected _field(name: string | null, unpacker: Unpacker<any>) {
    return new FieldStruct(this._wrappedUnpacker, [[name, unpacker]])
  }

  field<K extends string, V>(
    name: K,
    unpacker: Unpacker<V>
  ): StructUnpacker<T & { [_ in K]: V }> {
    return this._field(name, unpacker)
  }

  check(unpacker: Unpacker<any>): StructUnpacker<T> {
    return this._field(null, unpacker)
  }

  after<K extends string, V>(
    name: K,
    afterFn: (unpacking: Unpacking<T>) => Unpacker<V>
  ): StructUnpacker<T & { [_ in K]: V }> {
    return new StructUnpacker(afterStruct(this._wrappedUnpacker, name, afterFn))
  }

  afterCheck(
    afterFn: (unpacking: Unpacking<T>) => Unpacker<any>
  ): StructUnpacker<T> {
    return new StructUnpacker(afterCheckStruct(this._wrappedUnpacker, afterFn))
  }

  [unpackerSymbol](buf: Buffer, begin: number): Unpacking<T> {
    return unpack(this._wrappedUnpacker, buf, begin)
  }
}
