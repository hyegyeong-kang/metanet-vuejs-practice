<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name: 'Home'}">HOME</router-link>  
    <!--  다시 렌더링 받지 않도록 하려고 router-link 쓰는 것 (a태그 안쓰고) -->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'Todos'}">TODOS</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
  <router-view/>
  </div>
</template>

<script>
export default {

}

</script>

<style>


</style>
