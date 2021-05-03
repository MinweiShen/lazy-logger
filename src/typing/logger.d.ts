export interface Logger {
  debug(msg: string, group: string): void;
  info(msg: string, group: string): void;
  warn(msg: string, group: string): void;
  error(msg: string, group: string): void;
}