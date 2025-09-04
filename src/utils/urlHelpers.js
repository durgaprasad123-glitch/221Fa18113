export function ensureProtocol(u){
  if (!u) return u;
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}
export function genId(len = 6){
  return Math.random().toString(36).slice(2, 2 + len);
}
export function isValidId(s){
  return /^[a-zA-Z0-9]{4,12}$/.test(s);
}
export function getLocation() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone; }
  catch { return 'Unknown'; }
}
