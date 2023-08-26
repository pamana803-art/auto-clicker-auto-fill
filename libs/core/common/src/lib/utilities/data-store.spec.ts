import { DataStore } from './data-store';

beforeAll(() => {
  DataStore.getInst().setItem('string', 'world');
  DataStore.getInst().setItem('number', 5);
  DataStore.getInst().setItem('boolean', true);
  DataStore.getInst().setItem('json', { firstName: 'Dharmesh', lastName: 'Patel' });
  DataStore.getInst().setItem('array', ['name', 'age', 'sex']);
});

describe('DataStore', () => {
  describe('getItem', () => {
    test('string', () => {
      expect(DataStore.getInst().getItem('string')).toEqual('world');
    });
    test('number', () => {
      expect(DataStore.getInst().getItem('number')).toEqual(5);
    });
    test('boolean', () => {
      expect(DataStore.getInst().getItem('boolean')).toBeTruthy();
    });
    test('json', () => {
      expect(DataStore.getInst().getItem('json')).toEqual({
        firstName: 'Dharmesh',
        lastName: 'Patel',
      });
      expect(DataStore.getInst().getItem('json').firstName).toEqual('Dharmesh');
      expect(DataStore.getInst().getItem('json').lastName).toEqual('Patel');
    });
    test('array', () => {
      expect(DataStore.getInst().getItem('array')[0]).toEqual('name');
      expect(DataStore.getInst().getItem('array')[1]).toEqual('age');
      expect(DataStore.getInst().getItem('array')[2]).toEqual('sex');
    });
  });
});
