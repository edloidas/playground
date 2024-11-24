import assert from 'assert/strict';
import test, { describe } from 'node:test';
import { Options, query } from './select2';

type User = {
  id: number;
  name: string;
  age: number;
};

const data: User[] = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Jack', age: 40 },
  { id: 4, name: 'Jill', age: 35 },
  { id: 5, name: 'James', age: 20 },
  { id: 6, name: 'Judy', age: 15 },
  { id: 7, name: 'Joe', age: 50 },
];

const shortData: User[] = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Jack', age: 40 },
];

describe('select2.select()', () => {
  test('selects all data', () => {
    assert.deepEqual(query(data), data);
    assert.deepEqual(query(shortData), shortData);
  });

  test('sort (numbers)', () => {
    const options: Options<User> = {
      sort: {
        by: 'age',
        order: 'DESC',
      },
    };

    const result = query(shortData, options);

    assert.deepEqual(result, [
      { id: 3, name: 'Jack', age: 40 },
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
    ]);
  });

  test('sort (strings)', () => {
    const options: Options<User> = {
      sort: {
        by: 'name',
        order: 'ASC',
      },
    };

    const result = query(shortData, options);

    assert.deepEqual(result, [
      { id: 3, name: 'Jack', age: 40 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 1, name: 'John', age: 30 },
    ]);
  });

  test('select', () => {
    const options: Options<User> = {
      select: ['name', 'age'],
    };

    const result = query(shortData, options);

    assert.deepEqual(result, [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Jack', age: 40 },
    ]);
  });

  test('selects, filters, and sorts data', () => {
    const result = query(data, {
      where: [
        { column: 'age', operator: '>', value: 30 },
        { column: 'age', operator: '<', value: 50 },
      ],
      sort: {
        by: 'age',
        order: 'ASC',
      },
      select: ['name', 'age'],
    });

    // age > 30 and age < 50
    // sort by age asc
    // select name, age
    assert.deepEqual(result, [
      { name: 'Jill', age: 35 },
      { name: 'Jack', age: 40 },
    ]);
  });
});
