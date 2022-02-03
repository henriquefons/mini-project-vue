<template>
  <div class="col">
    <div class="card text-dark bg-light todo">
      <div class="card-header">Criar Tarefa</div>
      <div role="button" class="card-body">
        <form @submit.prevent="saveTodo" v-if="!todo.id">
          <input v-model="newTodos[index].title" placeholder="Nome da tarefa" type="text" class="form-control" id="title" aria-describedby="title">
          <input v-model="newTodos[index].due_on" type="datetime-local" class="mt-2 datetime-todo form-control" id="datetime-local">
          <div class="form-check mt-2">
            <input v-model="newTodos[index].status" type="checkbox" class="form-check-input" id="status">
            <label class="form-check-label" for="status">Marcar como completa</label>
          </div>
          <div class="card-footer d-flex justify-content-between bg-transparent mt-2">
            <button @click="removeNewTodo(index)" class="btn btn-danger">
              Excluir
            </button>
            <button type="submit" class="btn btn-success">
              Salvar
            </button>
          </div>
        </form>
        <div v-if="todo.id">
          <h5 class="card-title">Secondary card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('todo', ['newTodos']),
  },
  methods: {
    ...mapMutations('todo', ['removeNewTodo']),
    saveTodo() {
      console.log(this.formData)
    }
  },
  props: {
    index: Number,
    todo: Object,
  }
}
</script>

<style scoped>
 .datetime-todo{
   width: 100%;
 }
</style>
