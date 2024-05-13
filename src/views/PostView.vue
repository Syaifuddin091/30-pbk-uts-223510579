<template>
  <div class="container">
    <header class="header">
      <nav class="navbar">
        <router-link to="/" >TodoList</router-link>
        <router-link to="/PostView" class="active">Posts</router-link>
      </nav>
    </header>
    <h3 class="post-1">✍️Post</h3>
    <div class="posts" id="post">
      <h1>Postingan dari :</h1>
      <h2>{{ selectedUserName }}</h2> 
      <select v-model="selectedUser" class="selectModel" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>

      <div v-if="isLoading">
        <div class="loading-message">Loading...</div>
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
    color: #000000; 
  }
}
section {
  min-height: 100vh;
  padding: 10rem 9% 2rem; 
}
.navbar .active{
  color: #00aaff;
}

.navbar a {
  font-size: 1.4rem;
  color: rgb(255, 255, 255);
  margin: 0 2cap; 
  font-weight: 700;
  text-decoration: none; 
}


.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2cap 0%;
  z-index: 1000; 
  background-color: rgb(17, 16, 101);
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.container {
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  margin-top: -10px;
  margin-bottom: -10px;
}

.posts {
  width: 100%;
  max-width: 900px;
  background-color: transparent;
  margin: 50px auto 20px;
  padding: 40px 40px 70px;
  border-radius: 5px;
  border: 1px solid rgb(47, 47, 47);
}

.posts h1{
  color: rgb(255, 255, 255);
  margin-bottom: 20px;
}

.posts h2{
  color: rgb(255, 255, 255);
  margin-bottom: 20px;
}


.loading-message {
  display: flex;
  justify-content:center;
  text-align: center;
  margin-bottom: 10px;
  max-width: 100px;
  background-color: rgb(17, 16, 101);
  border-radius: 10px;
  padding: 2px;
}

.selectModel {
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  text-align:left;
  border: 1px solid #545454;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.selectModel:focus {
  outline: none;
  border-color: #00aaff; 
}

.posts ul {
  list-style-type: none; 
  padding-left: 0; 
  background-color: rgb(17, 16, 101);
  padding: 10px;
  border-radius: 10px;
}

.posts li {
  color: rgb(0, 0, 0);
  margin-bottom: 10px; 
}

.posts h3, .posts p {
  text-align: left; 
}

.posts p {
  padding: 0 0 0 25px;
  color: rgb(255, 255, 255);
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
}

.post-1 {
  align-items: center;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 5.5rem;
}
</style>