import { UnknownGroupError } from "./errors";
import Log from "./log";
import { LEVEL } from "./typing/level";

class LogGroup {
  private logGroups: Map<string, Array<Log>>

  constructor() {
    this.logGroups = new Map();
  }

  add(groupName: string): LogGroup {
    if (!this.logGroups.has(groupName)) {
      this.logGroups.set(groupName, []);
    }
    return this;
  }

  delete(groupName: string): LogGroup {
    this.logGroups.delete(groupName);
    return this;
  }

  getGroupNames(): string[] {
    return Array.from(this.logGroups.keys());
  }

  get(group: string): Array<Log> {
    const logs = this.logGroups.get(group);
    return logs ? logs : [];
  }

  has(group: string): boolean {
    return this.logGroups.has(group);
  }

  log(msg: string, level: LEVEL, group: string): Log {
    if (!this.logGroups.has(group)) {
      throw UnknownGroupError(group);
    }  
    const logs = this.logGroups.get(group);
    const log = new Log(msg, level);
    logs?.push(log);
    return log;
  } 
}

export default LogGroup;