<template >
  <main class="app">
    <section class="greeting">
      <h3 class="title">✍️Aplikasi ToDo List </h3>
    </section>
    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3 class="do-it">{{ title }}</h3>
          <input
            type="text"
            placeholder="Tambahkan kegiatan"
            v-model="text"
          />
          <input type="submit" value="Add" />
        </form>
      </section>
    </div>
    <h2 class="centered-text" v-show="todos.length === 0">Tidak ada kegiatan😞</h2>
    <div class="todo-section">
      <section class="todo-list">
        <button class="hide" @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Show all' : 'Hide completed' }}</button>  
        <div class="edit-todo" v-if="editingTodo">
          <form @submit.prevent="saveEdit">
            <input
            type="text"
            v-model="editingTodo.todo"
            />
            <div class="q-gutter-sm">
              <button class="save-button" type="submit">Simpan</button>
              <button class="cancel-button" @click="cancelEdit">Batal</button>
            </div>
          </form>
        </div>
        <div class="list">
          <div
            v-for="todo in filter" :class="`todo-item ${todo.done && 'done'}`">
            <label v-show="!editingTodo">
              <input class="edit"type="checkbox" v-model="todo.done" />
            </label>

            <div class="todo-content">
              <ul>
                <li>{{ todo.todo }}</li>
              </ul>
            </div>
            <div class="actions">
              <button class="edit" @click="editTodo(todo)">Edit</button>
              <button class="delete" @click="deleteTodo(todo)">Hapus</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>


<script setup>
import { ref, onMounted, watch, computed, defineProps } from "vue";

const todos = ref([]);
const text = ref("");
const hideCompleted = ref(false);
const editingTodo = ref(null);

const filter = computed(() => {
  return hideCompleted.value ? todos.value.filter(todo => !todo.done) : todos.value;
});

const props = defineProps({
  title: {
    type: String,
    default: 'Apa yang ingin kamu lakukan?'
  },
  subtitle: {
    type: String,
    default: ''
  }
});


function addTodo() {
  if (text.value.trim() === "") {
    return;
  }

  todos.value.unshift({
    todo: text.value,
    done: false,
  });

  text.value = "";
  showAddForm.value = false;
}

function deleteTodo(todo) {
  todos.value = todos.value.filter((x) => x !== todo);
}

function editTodo(todo) {
  if (todo.done) {
    alert("Kegiatan yang sudah selesai tidak dapat diedit!");
    return;
  }

  editingTodo.value = todo;
  document.querySelectorAll('.edit').forEach(element => {
    element.style.display = 'none';
  });
}

function saveEdit() {
  editingTodo.value = null;
  document.querySelectorAll('.edit').forEach(element => {
    element.style.display = 'block';
  });
}

function cancelEdit() {
  editingTodo.value = null;

  document.querySelectorAll('.edit').forEach(element => {
    element.style.display = 'block';
  });
}

watch(
  todos,
  (newTodoValue) => {
    localStorage.setItem("todos", JSON.stringify(newTodoValue));
  },
  { deep: true }
);

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});


</script> 


<style scoped>


:root {
  --primary: #3ca7bf;
  --business: #b347d4;
  --personal: var(--primary);
  --light: rgb(255, 255, 255);
  --grey: #888;
  --dark: #313154;
  --danger: #ff5b57;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0 auto;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin-top: 0;
  max-width: 500px;
}

input:not([type="radio"]):not([type="checkbox"]),
button {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  cursor: initial;
}

body {
  background: var(--light);
  color: white;
  align-items: center;
  max-width: 500px;
}

section {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5em;
}

h3 {
  align-items: center;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 10px;
}


.title {
  align-items: center;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 2rem;
  font-weight: 400;
}

he .title{
  margin-top: 1.5rem;
}

.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.3rem;
  font-size: 30px;
  color: white;
}
h4 {
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.greeting .title {
 text-align: center;
}

.greeting .title input {
  margin-left: 0.5rem;
  flex: 1 1 0%;
  min-width: 0;

}

.greeting .title,
.greeting .title input {
  color: rgb(255, 255, 255);
  font-size: 2rem;
  font-weight: 700;
}

.create-todo input[type="text"] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 253, 253);
  border-radius: 0.5rem;
  border: 1px solid rgb(0, 26, 110); 
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
}

.create-todo .cate-option {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1.5rem;
}

.create-todo .cate-option label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #101c43;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  cursor: pointer;
}

input[type="checkbox"] {
  height: 25px;
  width: 25px;
  color: green;
}

.bubble.personal::after {
  background-color: var(--personal);
  box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
  width: 10px;
  height: 10px;
  opacity: 1;
}

.create-todo .cate-option label div {
  color: white;
  font-size: 1.125rem;
  margin-top: 1rem;
}

.create-todo input[type="submit"] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: #fff;
  background-color: #00318B;
  border-radius: 0.5rem;
  box-shadow: var(--personal-glow);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
  opacity: 0.75;
}

.todo-list .list {
  margin: 1rem 0;
}


.todo-list .todo-item {
  display: flex;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;

}

.todo-item label {
  display: block;
  margin-right: 1rem;
  cursor: pointer;
}

.todo-item .todo-content {
  flex: 1 1 0%;
}

.todo-item .todo-content ul li {
  display: flex;
  color: rgb(0, 0, 0);
  font-size: 1.125rem;
  align-items: flex-start;
  justify-content: flex-start;
  text-decoration: none;
  text-align: center;

}

.todo-item .actions {
  display: flex;
  align-items: center;
}

.todo-item .actions button {
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
  opacity: 0.75;
}

.todo-item .actions .edit {
  margin-right: 0.5rem;
  background-color: #00318B;
}

.todo-item .actions .delete {
  background-color: var(--danger);
  margin-left: 5px;
  background-color: #d32f2f;
}


.todo-item.done .todo-content ul li {
  text-decoration: line-through;
  color: rgba(165, 165, 165, 0.752);
}

.input-section,
.todo-section {
  border: 1px solid rgb(47, 47, 47);
  border-radius: 10px;
  margin-top: 30px;
}

.hide{
  margin-bottom: 35px;
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: #fff;
  background-color: #00318B;
  border-radius: 0.5rem;
  box-shadow: var(--personal-glow);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.todo-list .hide :hover{
  opacity: 0.75;
}

.edit-todo{
  margin-top: 8px;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;

}
.edit-todo form {
  display: flex;
  align-items: center; 
  border: 1px solid #022057;
  padding: 10px;
  border-radius: 5px;
}

.edit-todo input {
  flex: 2;
  padding: 8px;
  margin-right: 10px;
  color: rgb(0, 0, 0);
  font-size: 1rem;
}

.edit-todo .save-button {
  background-color: #4CAF50;
  color: white;
  margin-right: 5px;
  border-radius: 5px;
}

.edit-todo .save-button:hover {
  background-color: #45a049;
}


.edit-todo .cancel-button {
  background-color: #f44336;
  border-radius: 5px;
  color: white;
}

.edit-todo .cancel-button:hover {
  background-color: #d32f2f;
}


.edit-todo button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}


.edit-todo button:hover {
  background-color: #45a049;
}


</style>