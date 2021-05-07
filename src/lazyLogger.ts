import { UnknownGroupError } from './errors';
import Log from './log';
import LogGroup from './logGroup';
import { LEVEL } from './typing/level';
import { Logger } from './typing/logger';

interface IOption {
  immediate?: boolean;
  maxSize?: null | number;
  logLevel?: LEVEL;
  collect?: boolean;
}

type LogArray = Array<ReturnType<Log['toJSON']>>;

const defaultOptions: Required<IOption> = {
  immediate: false, // TODO
  maxSize: null, // TODO
  logLevel: 'debug',
  collect: true, // TODO
};

const LogLevelToNum: Record<LEVEL, number> = {
  debug: 3,
  info: 2,
  warn: 1,
  error: 0
};

const DEFAULT_GROUP = '_default_';

class LazyLogger implements Logger {
  private options: Required<IOption>;
  private logGroups: LogGroup;
  private logLevel: number;

  constructor(options: IOption = {}) {
    this.options = {...defaultOptions, ...options};
    this.logGroups = new LogGroup();
    this.logLevel = LogLevelToNum[this.options.logLevel];
    this.init();
  }

  init(): void {
    this.logGroups.add(DEFAULT_GROUP);
  }

  addGroup(groupName: string): LazyLogger {
    this.logGroups.add(groupName);
    return this;
  }

  deleteGroup(groupName: string): LazyLogger {
    if (groupName !== DEFAULT_GROUP) {
      this.logGroups.delete(groupName);
    }
    return this;
  }

  getGroupNames(): string[] {
    return this.logGroups.getGroupNames();
  }

  private addLog(msg: string, level: LEVEL, group = DEFAULT_GROUP) {
    if (this.logLevel < LogLevelToNum[level]) return;
    const { collect, immediate } = this.options;
    const log: Log = collect ? this.logGroups.log(msg, level, group) : new Log(msg, level);
    if (immediate) {
      this.emit(log);
    }
  }

  private emit(log: Log): void {
    console.log(log.toJSON());
  }

  debug(msg: string, group = DEFAULT_GROUP): void {
    this.addLog(msg, 'debug', group);
  }

  info(msg: string, group = DEFAULT_GROUP): void {
    this.addLog(msg, 'info', group);
  }

  warn(msg: string, group = DEFAULT_GROUP): void {
    this.addLog(msg, 'warn', group);
  }

  error(msg: string, group = DEFAULT_GROUP): void {
    this.addLog(msg, 'error', group);
  }

  /**
   * It returns logs of a given group.
   * When group is omitted, the default group will be used
   *
   * @param {*} [group=DEFAULT_GROUP]
   * @returns Array<Log.toJSON()>
   * @memberof LazyLogger
   */
  getLogs(group = DEFAULT_GROUP): LogArray {
    if (!this.logGroups.has(group)) {
      throw UnknownGroupError(group);
    }
    const logs = this.logGroups.get(group) as Array<Log>;
    return logs.map(log => log.toJSON());
  }

  getAllLogs(): Record<string, LogArray> {
    const keys = Array.from(this.logGroups.getGroupNames());
    const result: Record<string, LogArray> = {};
    return keys.reduce((acc, key) => {
      acc[key] = this.getLogs(key);
      return acc;
    }, result);
  }
}

export default LazyLogger;