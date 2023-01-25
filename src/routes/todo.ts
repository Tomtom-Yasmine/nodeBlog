import express from 'express'
import { createToDoList, getToDoLists, deleteToDoList, updateToDoList } from '../handlers/todo'

const app = express.Router()

app.post('/todoList', createToDoList);
app.get('/todoList', getToDoLists);
app.delete('/todoList/:id', deleteToDoList);
app.put('/todoList/:id', updateToDoList);

export default app