export type Data = Record<string, string | number | boolean>;

export type Operator = '<' | '>' | '=' | '!=';

export type Where<T extends Data, K extends keyof T = keyof T> = {
  column: K;
  operator: Operator;
  value: T[K];
};

export type Order = 'ASC' | 'DESC';

export type Sort<T extends Data, K extends keyof T = keyof T> = {
  by: K;
  order: Order;
};

export type Select<T extends Data, K extends keyof T = keyof T> = K;

export type Options<T extends Data> = {
  where?: Where<T>[];
  sort?: Sort<T>;
  select?: Select<T>[];
};

export function query<T extends Data = Data>(
  data: T[],
  options: Options<T> = {}
): Pick<T, Select<T>>[] {
  const { where, sort, select } = options;

  let result = [...data];

  result = where ? doFilter(result, where) : result;

  result = sort ? doSort(result, sort) : result;

  result = select ? doSelect(result, select) : result;

  return result;
}

export function doSort<T extends Data>(data: T[], { by, order }: Sort<T>): T[] {
  const result = data.sort((a, b) => {
    const aBy = a[by];
    const bBy = b[by];
    if (typeof aBy === 'number' && typeof bBy === 'number') {
      return aBy - bBy;
    } else if (typeof aBy === 'string' && typeof bBy === 'string') {
      return aBy.localeCompare(bBy);
    } else if (typeof aBy === 'boolean' && typeof bBy === 'boolean') {
      return aBy === bBy ? 0 : aBy ? -1 : 1;
    } else {
      throw new Error('Invalid type');
    }
  });

  return order === 'ASC' ? result : result.reverse();
}

export function doSelect<T extends Data, K extends Select<T>>(
  data: T[],
  select: K[]
): Pick<T, K>[] {
  return data.map((item) => {
    const result: Pick<T, K> = {} as Pick<T, K>;
    select.forEach((key) => {
      result[key] = item[key];
    });
    return result;
  });
}

function doFilter<T extends Data>(data: T[], wheres: Where<T>[]): T[] {
  return data.filter((item) => wheres.every((where) => doWhere(item, where)));
}

function doWhere<T extends Data>(data: T, where: Where<T>): boolean {
  const value = data[where.column];
  switch (where.operator) {
    case '<':
      return value < where.value;
    case '>':
      return value > where.value;
    case '=':
      return value === where.value;
    case '!=':
      return value !== where.value;
    default:
      throw new Error('Invalid operator');
  }
}
