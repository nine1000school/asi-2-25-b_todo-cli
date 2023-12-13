import { readFileSync, writeFileSync } from "node:fs";

const DB_PATH = "./db.json";
const readDatabase = () =>
  JSON.parse(readFileSync(DB_PATH, { encoding: "utf-8" }));
const writeDatabase = (data) =>
  writeFileSync(DB_PATH, JSON.stringify(data), {
    encoding: "utf-8",
  });
const printTodo = (todo) => console.log(`- ${todo}`);
const [commandName, ...args] = process.argv.slice(2);
const commands = {
  add: ([todo]) => {
    const db = readDatabase();

    writeDatabase([...db, todo]);

    printTodo(todo);
  },
  list: () => {
    const db = readDatabase();

    db.forEach(printTodo);
  },
};
const command = commands[commandName];

if (!command) {
  console.error(`No such command: "${commandName}"`);
  process.exit(1);
}

command(args);
