<template>
  <main class="app">
    <section class="greeting">
      <h3 class="title">✍️Aplikasi ToDo List </h3>
    </section>

    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>Apa yang ingin kamu lakukan🙂?</h3>
          <input
            type="text"
            placeholder="Tambahkan kegiatan"
            v-model="text"
          />

          <input type="submit" value="Add" />
        </form>
      </section>
    </div>

    <div class="todo-section">
      <section class="todo-list">
        <button class="hide" @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Show all' : 'Hide completed' }}</button>
        <h2 v-show="todos.length === 0">Tidak ada kegiatan😞</h2>
        

        <div class="list">
          <div
            v-for="todo in filter"
            :class="`todo-item ${todo.done && 'done'}`"
          >
            <label>
              <input type="checkbox" v-model="todo.done" />
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>

            <div class="actions">
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
}

function deleteTodo(todo) {
  todos.value = todos.value.filter((x) => x !== todo);
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