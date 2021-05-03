import { UnknownGroupError } from './errors';
import Log from './log';
import { LEVEL } from './typing/level';
import { Logger } from './typing/logger';

interface IOption {
  immediate?: boolean;
  maxSize?: null | number;
  logLevel?: LEVEL;
}

type LogArray = Array<ReturnType<Log['toJSON']>>;

const defaultOptions: Required<IOption> = {
  immediate: false,
  maxSize: null,
  logLevel: 'debug'
};

const LogLevelToNum = {
  debug: 3,
  info: 2,
  warn: 1,
  error: 0
};

const DEFAULT_GROUP = 'default';

class LazyLogger implements Logger {
  private options: Required<IOption>;
  private logGroups: Map<string, Array<Log>>
  private logLevel: number;

  constructor(options: IOption = {}) {
    this.options = {...defaultOptions, ...options};
    this.logGroups = new Map();
    this.addGroup(DEFAULT_GROUP);
    this.logLevel = LogLevelToNum[this.options.logLevel];
  }

  addGroup(groupName: string): LazyLogger {
    if (!this.logGroups.has(groupName)) {
      this.logGroups.set(groupName, []);
    }
    return this;
  }

  deleteGroup(groupName: string): LazyLogger {
    if (groupName !== DEFAULT_GROUP) {
      this.logGroups.delete(groupName);
    }
    return this;
  }

  getGroups(): string[] {
    return Array.from(this.logGroups.keys());
  }

  private addLog(msg: string, level: LEVEL, group = DEFAULT_GROUP) {
    if (this.logLevel < LogLevelToNum[level]) return;
    if (!this.logGroups.has(group)) {
      throw UnknownGroupError(group);
    } else {
      const logs = this.logGroups.get(group);
      logs?.push(new Log(msg, level))
    }
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

  getLogs(group = DEFAULT_GROUP): LogArray {
    if (!this.logGroups.has(group)) {
      throw UnknownGroupError(group);
    }
    const logs = this.logGroups.get(group) as Array<Log>;
    return logs.map(log => log.toJSON());
  }

  getAllLogs(): Record<string, LogArray> {
    const keys = Array.from(this.logGroups.keys());
    const result: Record<string, LogArray> = {};
    return keys.reduce((acc, key) => {
      acc[key] = this.getLogs(key);
      return acc;
    }, result);
  }
}

export default LazyLogger;