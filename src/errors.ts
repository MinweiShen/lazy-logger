export function UnknownGroupError(group: string): Error {
  return Error(`Unknown group ${group}`);
}