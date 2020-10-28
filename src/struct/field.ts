import { Unpacker } from "../core"
import { Entry, fields, ObjectWithUnpackers } from "../field"
import { StructUnpacker } from "./base"
export { StructUnpacker } from "./base"

export class FieldStruct<T extends {}, U extends {}> extends StructUnpacker<
  T & U
> {
  constructor(
    protected readonly _innerUnpacker: Unpacker<T>,
    protected readonly _pairs: readonly (
      | Entry<ObjectWithUnpackers<U>>
      | [null, Unpacker<any>]
    )[]
  ) {
    super(fields<T, U>(_innerUnpacker, _pairs))
  }

  protected _field(
    name: string | null,
    fieldUnpacker: Unpacker<any>
  ): FieldStruct<T, U & any> {
    return new FieldStruct(this._innerUnpacker, [
      ...this._pairs,
      [name, fieldUnpacker],
    ])
  }
}
