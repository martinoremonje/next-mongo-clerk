import { prisma } from "../libs/pismadb";
import FormTodo from "./todo/components/form.todo";
import ListTodo from "./todo/components/list.todo";

import {  currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

const TodoPage = async () => {
  const user = await currentUser()
  
  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id
    }
  });
  
  

  return (
    <div>

      <h1 className="text-center text-3xl my-10">Welcome: {user.username}</h1>
      <UserButton afterSwitchSessionUrl="/login"/>
      <FormTodo />
      <ListTodo todos={todos} />
    </div>
  );
};
export default TodoPage;