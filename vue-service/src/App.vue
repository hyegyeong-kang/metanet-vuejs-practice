<template>
  <div class="container">
    <h2>To-Do</h2>
    <form
      @submit.prevent="onSubmit"
    >
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
        <div>
          <button
            class="btn btn-primary"
            @click="onSubmit"
          > Add </button> 
        </div>
      </div>
      <div v-if="hasError" style="color: red"> This is cannot be empty </div>
    </form>
    {{todos}}
    <!--  for 문 돌릴 때 유일한 키 값이 있어야 한다. -->
    <div  
      v-for="todo in todos" 
      :key="todo.id"
      class="card mt-2">
      <div class="card-body p-2">
        {{todo.subject}}
      </div>
    </div>
  </div>

</template>

<script>

import { ref } from 'vue';

export default {
  setup(){
    const todo = ref('');   // ref 로 하면 무조건 .value 해줘야 함
    const todos = ref([
      {id: 1, subject: 'vue study'},
      {id: 2, subject: 'spring'}
    ]);

   // 배열, 객체는 reactive 사용
   // const name = ref({       // reactive 쓰면 .value 쓰지 않아도 됨
   //   id: 1
   // })


    const hasError = ref(false);
  
    const onSubmit = () => {
     // e.preventDefault();
     if(todo.value == '') {
      hasError.value = true;
     } else {
        todos.value.push({
        id: Date.now(),
        subject: todo.value
      });
      hasError.value = false;
     }
    }


    return{ // 추가해주는 것 잊지말기
      todo,
      onSubmit,
      todos,
      hasError,
    }
  }
}
</script>

<style>
  .name{
    color: red;
  }
</style>
