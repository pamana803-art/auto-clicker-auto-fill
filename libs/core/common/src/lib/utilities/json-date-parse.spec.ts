import { dateParser } from '../..';

describe('dateParser', () => {
  test('works', () => {
    const d = new Date();
    expect(dateParser(d.toJSON())).not.toBeNull();
    expect(dateParser(d.toJSON())).toEqual(d);
    expect(dateParser('test')).toEqual('test');
    expect(dateParser(123)).toEqual(123);
  });
});
