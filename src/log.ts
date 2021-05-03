import { LEVEL } from "./typing/level";

class Log {
  private ts: Date;
  private msg: string;
  private level: LEVEL;
  
  constructor(msg: string, level: LEVEL) {
    this.ts = new Date();
    this.level = level;
    this.msg = msg;
  }

  toJSON(): Record<string, string> {
    return {
      timestamp: this.ts.toISOString(),
      level: this.level,
      message: this.msg,
    }
  }
}

export default Log;