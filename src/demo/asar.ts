import * as u from ".."
import { Unpacker } from "../core"

interface AsarHeaderPackedFile {
  offset: string
  size: number
  executable?: boolean
  unpacked?: false
}
interface AsarHeaderUnpackedFile {
  size: number
  unpacked: true
}
type AsarHeaderFile = AsarHeaderPackedFile | AsarHeaderUnpackedFile
interface AsarHeaderDirectory {
  files: Record<string, AsarHeaderFile | AsarHeaderDirectory>
}

const isFile = (v: AsarHeaderFile | AsarHeaderDirectory): v is AsarHeaderFile =>
  (v as Partial<AsarHeaderDirectory & AsarHeaderFile>).size != null

interface AsarHeaderEntry extends Omit<AsarHeaderFile, "offset" | "size"> {
  name: string
  offset: bigint
  size: bigint
}

const asarHeaderEntries = (
  dir: AsarHeaderDirectory,
  prefix = "."
): AsarHeaderEntry[] =>
  Object.entries(dir.files).flatMap(([fileName, content]) => {
    const name = `${prefix}/${fileName}`
    if (isFile(content)) {
      if (content.unpacked) return []

      return {
        ...content,
        name,
        offset: BigInt(content.offset),
        size: BigInt(content.size),
      }
    } else {
      return asarHeaderEntries(content, name)
    }
  })

const jsonUnpacker = <T>(length?: number | Unpacker<number>) =>
  u.map(u.utf8(length), ({ value }) => JSON.parse(value) as T)

const toUintNumber = (n: bigint) => {
  if (n > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("")
  return Number(n)
}

export const asarUnpacker = u
  .struct()
  .check(u.skip(12)) // Skip Pickle specific wrapping
  .field("header", jsonUnpacker<AsarHeaderDirectory>(u.uInt32LE))
  .check(u.skip(3)) // Skip Pickle specific padding
  .after(
    "files",
    ({ value }) =>
      asarHeaderEntries(value.header)
        .sort((a, b) => {
          const n = a.offset - b.offset
          return n > 0n ? 1 : n < 0n ? -1 : 0
        })
        .reduce(
          ({ fileStruct, runningOffset }, entry) => {
            if (runningOffset < entry.offset)
              fileStruct = fileStruct.check(
                u.skip(toUintNumber(entry.offset - runningOffset))
              )

            fileStruct = fileStruct.field(
              entry.name,
              u.raw(toUintNumber(entry.size))
            )

            runningOffset = entry.offset + entry.size

            return { fileStruct, runningOffset }
          },
          {
            fileStruct: u.struct() as u.StructUnpacker<Record<string, Buffer>>,
            runningOffset: 0n,
          }
        ).fileStruct
  )
