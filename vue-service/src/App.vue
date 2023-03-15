<template>
  <input 
    type="type"
    v-model="name"  
  >
  <button
    class="btn btn-primary"
    @click="onSubmit"
  >
    Click 
  </button>
</template>

<script>

import { ref } from 'vue';

export default {
  setup(){
    const name = ref("kosa");   // ref 로 하면 무조건 .value 해줘야 함 

   // 배열, 객체는 reactive 사용
   // const name = ref({       // reactive 쓰면 .value 쓰지 않아도 됨
   //   id: 1
   // })
  
    const onSubmit = () => {
      console.log(name);
    }

    const updateName = (e) => {
      console.log(e.target.value);
    }

    return{ // 잊지말기
      name,
      onSubmit,
      updateName,
    }
  }
}
</script>

<style>
  .name{
    color: red;
  }
</style>
