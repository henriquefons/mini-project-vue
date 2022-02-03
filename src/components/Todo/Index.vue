<template>
  <section>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4 mt-3">
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
import { mapGetters, mapMutations } from 'vuex'
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
  computed: {
    ...mapGetters('todo', ['newTodos']),
  },
  methods: {
    ...mapMutations('todo', ['addNewTodos']),
    removeNewTodo(index) {
      this.newTodos.splice(index, 1)
    }
  }
}
</script>

<style>
  .todo {
    height: 16rem;
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
