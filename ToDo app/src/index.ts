import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from 'inquirer';


let todos: TodoItem[] = [
  new TodoItem(1, "MSIC"),
  new TodoItem(2, "Bootcamp 2021"),
  new TodoItem(3, "AIC", true),
  new TodoItem(4, "Job"),
];

let collection: TodoCollection = new TodoCollection("Sultan", todos);
let showCompleted = true;

function displayTodoList(): void {


// console.clear();
console.log(`${collection.userName}'s Todo List`
+ `(${collection.getItemCounts().incomplete } items to do)`);
collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
enum Commands {
  Add = "Add New Task",
  Toggle = "Show/Hide Completed",
  Quit = "Quit"
}

function promptAdd(): void{
  console.clear();
  inquirer.prompt({type: "input", name: "add", message: "Enter task: "})
    .then(answers => {if (answers["add"] !== "") {
      collection.addTodo(answers["add"]);
    }
    promptUser();
  })
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: Object.values(Commands)}).then(answeres => {
       switch (answeres["command"]){
         case Commands.Toggle:
           showCompleted = !showCompleted;
           promptUser();
           break;
         case Commands.Add:
           promptAdd();
           break;
    }

  })
}

promptUser();
// let newId: number = collection.addTodo("Go for Run");
// let todoItem: TodoItem = collection.getTodoById(newId);

// //todoItem.printDetails();
// collection.removeComplete();
// // collection.addTodo(todoItem);
// collection.getTodoItems(true).forEach((item) => item.printDetails());
