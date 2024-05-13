<template>
    <div class="navbar">
      <nav class="nav">
        <router-link to="/" class="active">TodoList</router-link>
        <router-link to="/PostView">Posts</router-link>
      </nav>
    </div>
  <main class="app">
    <section class="greeting">
      <h3 class="title">✍️Aplikasi ToDo List </h3>
    </section>

    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3 class="do-it">Apa yang ingin kamu lakukan🙂?</h3>
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
            <button class="save-button" type="submit">Simpan</button>
            <button class="cancel-button" @click="cancelEdit">Batal</button>
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
import { ref, onMounted, watch, computed } from "vue";

const todos = ref([]);
const text = ref("");
const hideCompleted = ref(false);
const editingTodo = ref(null);

const filter = computed(() => {
  return hideCompleted.value ? todos.value.filter(todo => !todo.done) : todos.value;
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

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2cap 0%;
  z-index: 1000; 
  background-color: rgb(17, 16, 101);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.navbar a {
  font-size: 1.4rem;
  color: rgb(255, 255, 255);
  margin: 0 2cap; 
  font-weight: 700;
  text-decoration: none; 
}

.navbar .active{
  color: #00aaff;
}

</style>