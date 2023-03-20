import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';
import TodoCreate from '../pages/todos/create/index.vue'
//각각 경로의 컴포넌트 홈

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 어떤 경로로 왔을 때 그 컴포넌트를 이어줄까 (경로, name 둘 다 찾을 수 있게)
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name: 'TodoCreate',
            component: TodoCreate
        },
        {
            path: '/todos/:id', // id 가 있는게 뒤에 있도록 creat 는 앞에 두자
            name: 'Todo',
            component: Todo
        }
    ]
});

export default router;


// 만들어야 할 URL 경로
// /todos
// /todos/create
// /todos/:id
