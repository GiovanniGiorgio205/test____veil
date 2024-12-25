import { createHash } from "crypto"

export default function encrypt(text: string) {
  const hash = createHash("sha256").update(text).digest("hex")
  return hash
}
