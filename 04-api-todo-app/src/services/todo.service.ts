import { prisma } from "../db/client";
import { Todo } from "../interfaces/todo.interface";
import { randomUUID as uuid } from "node:crypto";
// import { v4 as uuid } from "uuid"; //? requiere de la instalacion de un paquete externo

// "base de datos"
// const todos: Todo[] = [];

export const getAll = async () => {
  return await prisma.todo.findMany({
    include: {
      user: {  
        select: { name: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

export const findById = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const create = async (todo: Partial<Todo>): Promise<Todo> => {
  // const newTodo: Todo = {
  //   id: uuid(),
  //   title: todo.title!,
  //   description: todo.description ?? null,
  //   completed: !!todo.completed,
  // };

  const newTodo = { id: uuid(), ...todo } as Todo;

  // todos.push(newTodo);
  return await prisma.todo.create({
    data: newTodo,
  });
};

export const update = async (
  todoId: string,
  payload: Partial<Todo>
): Promise<Todo | null> => {
  console.log("Modificando todo:", todoId, payload);
  return await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: payload,
  });
};

export const remove = async (todoId: string): Promise<Todo | null> => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};