<template>
  <h1>Todo Page</h1>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else
    @submit.prevent="onSave">
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Todo Subject</label>
                <input v-model="todo.subject" type="text" class="form-control">
             </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label>Status</label>
                <div>
                    <button 
                        class="btn"
                        type="button"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleTodoStatus"
                        >{{todo.completed ? 'Completed' : 'InCompleted'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">Save</button>
    <button class="btn btn-primary" @click="moveToListPage">Cancel</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed} from '@vue/reactivity';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import {onMounted, onBeforeUpdate, onUpdated, onUnmounted, onBeforeUnmount} from 'vue';


export default {
    components:{
        Toast
    },
    setup(){
        onBeforeUpdate(()=>{
            console.log(document.querySelector('#kosa'));
        });

        onMounted( () => {
            console.log(document.querySelector('#kosa'));
        });

        onBeforeUpdate( () => {
            console.log('before updated');
        });

        onUpdated( () => {
            console.log('updated');
        });

        onBeforeUnmount( () => {
            console.log('before unmounted');
        });

        onUnmounted( () => {
            console.log('unmounted');
        });

        console.log('Hi');

        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;
        const originalTodo = ref(null);


        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');

        const triggerToast = (message, type = 'success') => {
            showToast.value = true;
            toastMessage.value = message;
            toastAlertType.value = type;
            setTimeout(() => {
                toastMessage.value = '';
                showToast.value = false;
                toastAlertType.value = '';
            }, 3000);
        }

        const onSave = async () => {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed
            });
            originalTodo.value = {...res.data};  // 수정하고 나서 origin 을 새로운 값으로 변경해야 함
            triggerToast('successfully save !^0^!');
            console.log(res);
        }

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);  // 같지않으면 버튼 비활성화
        });

        const getTodo = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = {...res.data}; // 복사니까 완전한 새로운 주소값으로 가져오는 것
                originalTodo.value = {...res.data};
                loading.value = false;
            }catch(err){
                console.log(err);
                triggerToast('Something went wrong ㅠ.ㅠ', 'danger');
            }
        };

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToListPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        getTodo();

        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToListPage,
            onSave,
            todoUpdated,
            showToast,
            triggerToast,
            toastMessage,
            toastAlertType,
        };
    }
}
</script>

<style>

</style>