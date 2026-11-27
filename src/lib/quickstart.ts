import { API_CHAT } from './links'

/** The first call, shown on /pricing and /build. */
export const CURL_QUICKSTART = `curl ${API_CHAT} \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"hanzo/zen","messages":[{"role":"user","content":"Hello"}]}'`
