"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var todo_1 = require("../handlers/todo");
var app = express_1["default"].Router();
app.post('/todoList', todo_1.createToDoList);
app.get('/todoList', todo_1.getToDoLists);
app["delete"]('/todoList/:id', todo_1.deleteToDoList);
app.put('/todoList/:id', todo_1.updateToDoList);
exports["default"] = app;
//# sourceMappingURL=todo.js.map