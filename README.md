# tasa (Work In Progress)

tasa is a Node.js in-memory key/value store designed to run in a separate worker thread, with future considerations for running in a separate process.

<p align="center">
  <img alt="AI generated image of a can (tasa)" src="./assets/tasa.webp" height="300" />
</p>

## Synopsis

_The reason I built this library was to learn how to work with the new multi-threading functionalities in Nodejs._

_But, I ended up learning more about Typescript, Testing (TDD) and setting up an environment (hated my life in the process)._

_Even though I am making sure that the library works fine I don't recommend using it for production._

_One of the drawbacks is that communication between threads relies on serialization, and that's a bit slow._

## Usage:

An advanced use case that inspired me to build this was creating the kernel for something like `json-server` that auto-generates data with `fakerjs`.
And It would be amazing to have the data generation process in a separate thread.

Until we finalize and test that, here's a basic use case:

```ts
const tasa = new Tasa(); // Starts a new worker thread.
const users = tasa.new("users"); // creates an entity `users` that lives on that worker thread

/* Might wanna use a try/catch starting from here */

await users.set("foo", "bar");
await users.set("baz", 96);

const foo = await users.get("foo");
```

Each entity created is just a wrapper over `Map<string,unkown>`.

The data lives on the thread and you can perform operations on the data using `forEach`.

Communication is done asynchrounisly with promises.

## APIs:

Start by creating a New instance of `Tasa`.

```ts
// Params: operantType: "Worker"|"ChildProcess" = "Worker"
// Only Worker Threads are supported for the time being.
const tasa = new Tasa();
```

### Tasa

- `tasa.new(entityName: string): Entity` Creates a new entity and returns an `Entity` object.
- `tasa.getRef(entityName: string): Entity` Retrieves a reference to an existing entity if it exists.
- `tasa.list(): string[]` Returns a list of entity names as a string array.
- `tasa.dropEntity(entityName: string)` Deletes the specified entity.
- `tasa.dropAllEntities()` delete all entities.
- `tasa.kill()` Terminates the separate thread and deletes all entities.
- `tasa.reinit(operantType: "Worker"|"ChildProcess" = "Worker")` Re-initiate the worker thread or child process.
  > :warning: only Worker Threads are supported for the time being.

### Entity

A wrapper around `Map<string,unkown>`:

- `entity.set(entry: string, value: unkown): Promise<void>` add a new entry or change the value of
  an existing one.
- `entity.get(entry: string) Promise<unkown>` get the value of an entry.
- `entity.delete(entry: string) Pomise<void>` delete an entry in the Map.
- `entity.forEach(fn)` run a function on each entry with a possibility to change the values: `(entry: string, value: unknown) => undefined | unknown`
- `entity.keys(): Promise<string[]>`
- `entity.clean()` remove all entries in the Map.
- `entity.drop()` same as `tasa.dropEntity(entityName: string)`.
- `entity.query(): Query`

### Query

_(The implementation of the Query interface is still under consideration.)_
