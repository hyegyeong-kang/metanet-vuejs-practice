<template>
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
          <div v-if="editing" class="col-6">
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
          <div class="col-12">
            <div class="form-group">
                <label>body</label>
                <textarea v-model="todo.body" class="form-control" cols="30" rows="10">  
                </textarea>
            </div>
          </div>
      </div>
        <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="!todoUpdated">{{editing ? 'Update' : 'Create'}}
        </button>
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
  import {onUnmounted} from 'vue';
  import { useToast } from '@/composables/toast';
  
  export default {
      components:{
          Toast
      },
      props:{
            editing: {
                type: Boolean,
                default: false
            }
      },
      setup(props){
          onUnmounted( () => { // 페이지 떠났을 때 호출
              console.log('unmounted');
           //   clearTimeout(timeout.value); 
              // 3초 후 작업을 클리어시켜주는 것
              // 페이지 떠났는데 timeout 해줄필요 없어서 작업 취소해주는 것 -> 메모리 누수 예방
          });
  
          const route = useRoute();
          const router = useRouter();
          const todo = ref({
            subject: '',
            completed: false,
            body: ''
          });
          const loading = ref(false);
          const todoId = route.params.id;
          const originalTodo = ref(null);
  
          const{
              toastMessage,
              toastAlertType,
              showToast,
              triggerToast,
          } = useToast();
  
  
          const onSave = async () => {
            try{
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body
                };

                if(props.editing){
                    res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                }else{
                    res = await axios.post('http://localhost:3000/todos', data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                originalTodo.value = {...res.data};  // 수정하고 나서 origin 을 새로운 값으로 변경해야 함
                const message = 'Successfully' + (props.editing ? 'Update!' : 'Create!');
                triggerToast(message);
            }catch(err) {
                console.log(err);
                triggerToast('Something went wrong ㅠ.ㅠ', 'danger');
            }
          };
  
          const todoUpdated = computed(() => {
              return !_.isEqual(todo.value, originalTodo.value);  // 같지않으면 버튼 비활성화
          });
  
          const getTodo = async () => {
            loading.value = true;
              try{
                  const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                  todo.value = {...res.data}; // 복사니까 완전한 새로운 주소값으로 가져오는 것
                  originalTodo.value = {...res.data};
                  loading.value = false;
              }catch(err){
                loading.value = false;
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
          
          if(props.editing) {
            getTodo();
          }

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