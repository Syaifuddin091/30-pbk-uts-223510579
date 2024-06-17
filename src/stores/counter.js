import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || []
  }),
  actions: {
    addTodo(todo) {
      this.todos.unshift(todo)
      this.saveTodos()
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo)
      this.saveTodos()
    },
    updateTodo(todo) {
      const index = this.todos.findIndex(t => t.id === todo.id)
      if (index !== -1) {
        this.todos[index] = todo
        this.saveTodos()
      }
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
})
