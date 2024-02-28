import assert from 'assert/strict';
import test, { describe } from 'node:test';
import { select, sort, where } from './select';

type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
};

const data = [
  { id: 1, name: 'John', surname: 'Doe', age: 34 },
  { id: 2, name: 'John', surname: 'Doe', age: 33 },
  { id: 3, name: 'John', surname: 'Doe', age: 35 },
  { id: 4, name: 'Mike', surname: 'Doe', age: 35 },
];

describe('select.select()', () => {
  test('keeps data intact if not transformers provided', () => {
    const users = select<User>()(data);

    assert.deepEqual(users, [
      { id: 1, name: 'John', surname: 'Doe', age: 34 },
      { id: 2, name: 'John', surname: 'Doe', age: 33 },
      { id: 3, name: 'John', surname: 'Doe', age: 35 },
      { id: 4, name: 'Mike', surname: 'Doe', age: 35 },
    ]);
  });

  test('filters and sorts data', () => {
    const users = select<User>(
      where<User>({ name: 'John' }),
      where<User>({ surname: 'Doe' }),
      sort('age')
    )(data);

    assert.deepEqual(users, [
      { id: 2, name: 'John', surname: 'Doe', age: 33 },
      { id: 1, name: 'John', surname: 'Doe', age: 34 },
      { id: 3, name: 'John', surname: 'Doe', age: 35 },
    ]);
  });
});
