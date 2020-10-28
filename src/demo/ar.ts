import * as u from ".."

const trimmedAscii = (bytes: number) =>
  u.map(u.ascii(bytes), ({ value }) => value.trim())

const asciiEncodedNumber = (bytes: number, radix = 10) =>
  u.map(trimmedAscii(bytes), ({ value }) => Number.parseInt(value, radix))

const arEntry = u
  .struct()
  .field("fileIdentifier", trimmedAscii(16))
  .field(
    "modDate",
    u.map(asciiEncodedNumber(12), ({ value }) => new Date(value))
  )
  .field("ownerId", asciiEncodedNumber(6))
  .field("groupId", asciiEncodedNumber(6))
  .field("fileMode", asciiEncodedNumber(8, 8))
  .field("fileSize", asciiEncodedNumber(10))
  .check(u.magic([0x60, 0x0a]))
  .after("contents", ({ value }) => u.raw(value.fileSize))

const ar = u
  .struct()
  .check(u.magic("!<arch>\n", "ascii"))
  .field("files", u.array(arEntry))

export { ar }
