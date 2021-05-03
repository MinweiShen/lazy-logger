import Log from "../log"

describe('Log', () => {
  it('can be converted to JSON', () => {
    const log = new Log('test', 'debug');
    const json = log.toJSON();
    const keys = ['timestamp', 'message', 'level'];
    keys.forEach(key => expect(json[key]).toBeTruthy());
  })
})
