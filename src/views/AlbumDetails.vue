<template>
  <div>
    <q-page class="q-pa-md">
      <q-btn @click="goBack" label="Back to Albums" icon="arrow_back" color="primary" class="q-mb-md" />
      <div class="image-container">
        <q-list class="image-list">
          <q-item v-for="photo in photos" :key="photo.id" clickable @click="viewImage(photo.url, photo.title)">
            <q-item-section>
              <q-img :src="photo.thumbnailUrl" :alt="photo.title" class="small-img" />
              <q-item-label>{{ photo.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-dialog v-model="isDialogOpen">
        <q-card class="dialog-card">
          <q-img :src="selectedImage" :alt="selectedImageTitle" class="enlarged-img" />
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" @click="closeDialog" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const photos = ref([])
const selectedImage = ref(null)
const selectedImageTitle = ref('')
const isDialogOpen = ref(false)
const route = useRoute()
const router = useRouter()

const fetchPhotos = async (albumId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    photos.value = response.data
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}

const goBack = () => {
  router.push('/album')
}

const viewImage = (url, title) => {
  selectedImage.value = url
  selectedImageTitle.value = title
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

onMounted(() => {
  const albumId = route.params.id
  fetchPhotos(albumId)
})
</script>

<style scoped>
.image-container {
  display: flex;
  overflow-x: auto;
}

.image-list {
  display: flex;
  flex-direction: row;
  padding: 1px solid black;
}

.small-img {
  width: 100px;
  height: 100px;
  margin: 0 10px;
  padding: 1px solid black; 
}


.enlarged-img {
  max-height: 90vh;
  max-width: 90vw;
}
</style>
