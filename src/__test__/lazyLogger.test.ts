import LazyLogger from "../lazyLogger"

describe('LazyLogger', () => {
  it('can add a group', () => {
    const logger = new LazyLogger();
    logger.addGroup('test');
    expect(logger.getGroups()).toEqual(['default', 'test']);
  });

  it('can delete a group', () => {
    const logger = new LazyLogger();
    logger.addGroup('test');
    expect(logger.getGroups()).toEqual(['default', 'test']);
    logger.deleteGroup('test');
    expect(logger.getGroups()).toEqual(['default']);
  });

  it('can not delete the default group', () => {
    const logger = new LazyLogger();
    logger.deleteGroup('default');
    expect(logger.getGroups()).toEqual(['default']);
  });

  it('can add log to the default group', () => {
    const logger = new LazyLogger();
    logger.debug('test');
    expect(logger.getLogs().length).toBe(1);
  });

  it('can add log to an added group', () => {
    const logger = new LazyLogger();
    logger.addGroup('group');
    logger.debug('test', 'group');
    expect(logger.getLogs('group').length).toBe(1);
  });

  it('throw Unknown group Error', () => {
    const logger = new LazyLogger();
    expect(() => logger.debug('test', 'group')).toThrow();
  });

  it('can get all logs', () => {
    const logger = new LazyLogger();
    logger.addGroup('group');
    logger.debug('test', 'group');
    logger.debug('test');
    logger.debug('test');
    const allLogs = logger.getAllLogs();
    expect(Object.keys(allLogs).length).toBe(2);
    const total = Object.values(allLogs).reduce((acc, curr) => acc + curr.length, 0);
    expect(total).toBe(3);
  })

  it('ignore logs with lower priority', () => {
    const logger = new LazyLogger({
      logLevel: 'warn'
    });
    logger.debug('test');
    logger.info('test');
    logger.warn('test');
    logger.error('test');
    expect(logger.getLogs().length).toBe(2);
  })
})
