<template>
  <div class="col">
    <div class="card text-dark bg-light todo">
      <div class="card-header"  >
        {{todo.id ? 'Visualizar tarefa' : 'Criar tarefa'}}
      </div>
      <div class="card-body">
        <form @submit.prevent="saveTodo(newTodos[index])" v-if="!todo.id">
          <input required :class="errors.title && 'is-invalid'" v-model="newTodos[index].title" placeholder="Nome da tarefa" type="text" class="form-control" id="title">
          <div v-if="errors.title" class="invalid-feedback">{{errors.title}}</div>
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
              {{loadingTodo ? 'Salvando' : 'Salvar'}}
            </button>
          </div>
        </form>
        <div v-if="todo.id">
          <h5 :class="todo.status === 'completed'  ? 'text-decoration-line-through' : ''" 
            class="card-title"
          >
            {{todo.title}}
          </h5>
          <p :class="todo.status === 'completed'  ? 'text-decoration-line-through' : ''" 
            v-if="todo.due_on"
            class="card-text"
          >
            Vencimento: {{convertDate(todo.due_on)}}
          </p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('storage', ['currentUser']),
    ...mapGetters('todo', ['newTodos', 'errorTodo', 'loadingTodo']),
    errors() {
      if (!this.errorTodo) return {};
      // converte o array em um objeto
      const error = this.errorTodo.reduce((acc, { field, message }) => {
        acc[field] = message;
        return acc;
      }, {})
      return error;
    },
  },
  methods: {
    ...mapActions('todo', ['createTodo']),
    ...mapMutations('todo', ['removeNewTodo']),
    saveTodo(data) {
      const formData = {
        ...data,
        user_id: this.currentUser.id,
        status: data.status ? 'completed' : 'pending',
      }
      this.createTodo({data: formData, index: this.index})
    },
    convertDate(date) {
      const formatDate = new Date(date)
      return formatDate.toLocaleString('pt-BR', { timeZone: 'UTC', hour12: false, dateStyle: 'long', timeStyle: 'medium' });
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
