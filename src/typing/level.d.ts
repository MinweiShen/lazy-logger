export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}
export type LEVEL = Lowercase<keyof typeof LogLevel>;