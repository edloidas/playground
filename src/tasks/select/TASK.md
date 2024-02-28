# SQL SELECT

### Task

Create a `query` function that works like SQL's SELECT query.

Function must support:

- filtering (`WHERE (column1 > 10 OR column1 < 50) AND column3 = 'Foo'`)
- sorting (`ORDER BY column1 ASC, column2 DESC`)
- any number of arguments

### Time

Approximately 30 minutes.

### Data

```ts
const data = [
  { id: 1, name: "John", surname: "Doe", age: 34 },
  { id: 2, name: "John", surname: "Doe", age: 33 },
  { id: 3, name: "John", surname: "Doe", age: 35 },
  { id: 4, name: "Mike", surname: "Doe", age: 35 },
];

const ids = query(
  where({ name: "John" }),
  where({ surname: "Doe" }),
  sort("age")
)(data).map((u) => u.id);
// [2, 1, 3]
```
