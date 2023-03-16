<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
      >
    <hr>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red">{{ error }}</div>


    <div v-if="!todos.length">
      추가된 TODO 가 없습니다.
    </div>
      
    <div  v-if="!todos.length">
      There is nothing todo
    </div>

    <TodoList :todos="filteredTodos"
              @toggle-todo="toggleTodo"
              @delete-todo="deleteTodo"/>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        v-if="currentPage !== 1"
        class="page-item">
        <a class="page-link" @click="getTodos(currentPage - 1 )">Previous</a>
      </li>
      <li
        v-for= "page in numberOfPages"
        :key="page"
        class="page-item"
        :class="currentpage == page ? 'active' : ''">
        <a class="page-link" 
          @click="getTodos(page)">{{ page }}</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">{{ page }}</a></li>
      <li
        v-if="numberOfPages != currentpage" 
        class="page-item">
        <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import axios from "axios";
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup(){
    const todos = ref([]);
    const searchText = ref('');
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentpage = ref(7);
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const filteredTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

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

    const deleteTodo = async(index) => {
      try{
        await axios.delete(`http://localhost:3000/todos/${todos.value[index].id}`);

      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }


      todos.value.splice(index, 1);
    }

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      error.value = '';
      try{
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        //console.log(res.headers['x-total-count']);
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';

      try{
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        });
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    const toggleTodo = async(index) => {
      error.value='';
      const id = todos.value[index].id;
      try{
        await axios.delete(`http://localhost:3000/todos/${id}`, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;  // 기존에 있던 것에 반대값 넣어라
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }

    }


    return{ // 추가해주는 것 잊지말기
      todos,
      deleteTodo,
      addTodo,
      getTodos,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      numberOfTodos,
      limit,
      currentpage,
      numberOfPages,
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
