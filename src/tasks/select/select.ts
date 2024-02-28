type Transformer<T> = (data: T[]) => T[];

type Entry = Record<string, string | number | boolean>;

export function select<T extends Entry>(...transformers: Transformer<T>[]) {
  return (data: T[]): T[] => {
    return transformers.reduce(
      (entries: T[], transformer: Transformer<T>) => transformer(entries),
      [...data] satisfies T[]
    );
  };
}

export function where<T extends Entry>(columns: Partial<T>): Transformer<T> {
  return (data: T[]): T[] => {
    return data.filter((entry) => {
      for (const key in columns) {
        const column = columns[key];
        if (column != null && column !== entry[key]) {
          return false;
        }
      }
      return true;
    });
  };
}

export function sort<T extends Entry>(columnName: keyof T): Transformer<T> {
  return (data: T[]): T[] => {
    return [...data].sort((entryA, entryB) => {
      const a = entryA[columnName];
      const b = entryB[columnName];

      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a === b ? 0 : b ? -1 : 1;
      } else {
        throw new Error('Types of columns are not supported or incompatible.');
      }
    });
  };
}
