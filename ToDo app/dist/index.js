"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const inquirer = require("inquirer");
let todos = [
    new todoItem_1.TodoItem(1, "MSIC"),
    new todoItem_1.TodoItem(2, "Bootcamp 2021"),
    new todoItem_1.TodoItem(3, "AIC", true),
    new todoItem_1.TodoItem(4, "Job"),
];
let collection = new todoCollection_1.TodoCollection("Sultan", todos);
let showCompleted = true;
function displayTodoList() {
    // console.clear();
    console.log(`${collection.userName}'s Todo List`
        + `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter task: " })
        .then(answers => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands)
    }).then(answeres => {
        switch (answeres["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
        }
    });
}
promptUser();
// let newId: number = collection.addTodo("Go for Run");
// let todoItem: TodoItem = collection.getTodoById(newId);
// //todoItem.printDetails();
// collection.removeComplete();
// // collection.addTodo(todoItem);
// collection.getTodoItems(true).forEach((item) => item.printDetails());
