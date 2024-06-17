<template>
  <div class="container">
    <h3 class="post-1">✍️Post</h3>
    <div class="posts" id="post">
      <h1>Postingan dari :</h1>
      <h2>{{ selectedUserName }}</h2> 
      <select v-model="selectedUser" class="selectModel" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>

      <div v-if="isLoading">
        <q-spinner
        class="isLoading"
        color="primary "
        size="3em"
       />
      </div>

      <ul v-if="!isLoading"> 
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isLoading = ref(false); 
const selectedUser = ref(null);
const selectedUserName = ref('');
const users = ref([]);
const posts = ref([]);

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  users: {
    type: Array,
    required: true
  }
});

const fetchUser = async () => {
  try {
    isLoading.value = true; 
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    isLoading.value = false; 
  }
};

const fetchPosts = async () => {
  if (!selectedUser.value) return;
  isLoading.value = true;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    isLoading.value = false; 
  }
};

onMounted(() => {
  fetchUser();
});

watch(selectedUser, () => {
  posts.value = []; 
  fetchPosts();
  const selectedUserObject = users.value.find(user => user.id === selectedUser.value);
  selectedUserName.value = selectedUserObject ? selectedUserObject.name : '';
}, { immediate: true }); 
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .todo-app h2 ul li {
    color: #ffffff; 
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 10px;
}

h2{
  font-size: 50px;
}

.posts {
  width: 100%;
  max-width: 600px;
  background-color: transparent;
  padding: 20px 20px 50px;
  border-radius: 5px;
  border: 1px solid rgb(47, 47, 47);
  text-align: center;
}

.posts h1 {
  color: rgb(255, 255, 255);
  font-size: 2rem;
}

.posts h2 {
  color: rgb(255, 255, 255);
}

.q-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selectModel {
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  text-align: left;
  border: 1px solid #00318B;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.selectModel:focus {
  outline: none;
  border-color: #00318B; 
}

.posts ul {
  list-style-type: none; 
  padding-left: 0; 
  background-color: #00318B;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Poppins';
}

.posts li {
  color: rgb(255, 255, 255);
  margin-bottom: 10px;
  font-family: 'Poppins'; 
}

.posts h3, .posts p {
  text-align: left;
  font-family: 'Poppins'; 
}

.posts p {
  color: rgb(255, 255, 255);
  font-family: 'Poppins';
  font-style: italic;
  margin-left: 30px;
}

.post-1 {
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2rem;
}
</style>
