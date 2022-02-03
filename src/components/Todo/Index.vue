<template>
  <section>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4 mt-3">
        <div class="col" v-if="!todos">
          <div class="card text-white todo">
            <div class="card-body add-todo">
              <div v-if="loadingTodo" class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>  
        </div>
        <Todo v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index" />
        <Todo v-for="(todo, index) in newTodos" :key="index" :todo="todo" :index="index" />
        <div class="col">
          <div class="card text-white bg-secondary todo">
            <div class="card-header">Adicionar uma tarefa</div>
            <div @click="addNewTodos({...newTodo})" role="button" class="card-body add-todo">
              <i class="bi bi-plus-lg"></i>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Todo from './Todo.vue'
export default {
  data() {
    return {
      newTodo: {
        title: '',
        due_on: null,
        status: false,
      },
    }
  },
  components: { 
    Todo
  },
  created() {
    this.getTodos({ userId: this.currentUser.id })
  },
  unmounted() {
    this.resetTodoState();
  },
  computed: {
    ...mapGetters('storage', ['currentUser']),
    ...mapGetters('todo', ['newTodos', 'todos', 'loadingTodo']),
  },
  methods: {
    ...mapActions('todo', ['getTodos']),
    ...mapMutations('todo', ['addNewTodos', 'resetTodoState']),
    removeNewTodo(index) {
      this.newTodos.splice(index, 1)
    }
  }
}
</script>

<style>
  .todo {
    min-height: 16rem;
  }
  .add-todo {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .add-todo > i {
    font-size: 5rem;
  }
</style>
