<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"/>  
    <div v-if="!todos.length">
      추가된 TODO 가 없습니다.
    </div>

    <TodoList :todos="todos"
              @toggle-todo="toggleTodo"
              @delete-todo="deleteTodo"/>

  </div>
</template>

<script>

import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup(){
    const todos = ref([]);

   // 배열, 객체는 reactive 사용
   // const name = ref({       // reactive 쓰면 .value 쓰지 않아도 됨
   //   id: 1
   // })

    // const onSubmit = () => {
    //  // e.preventDefault();
    //  if(todo.value == '') {
    //   hasError.value = true;
    //  } else {
    //     todos.value.push({
    //     id: Date.now(),
    //     subject: todo.value,
    //     completed: false,
    //   });
    //   hasError.value = false;
    //   todo.value = '';
    //  }
    // }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;  // 기존에 있던 것에 반대값 넣어라
    }


    return{ // 추가해주는 것 잊지말기
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
    }
  }
}
</script>

<style>
 .todo{
  color : gray;
  text-decoration: line-through;
 }

</style>
