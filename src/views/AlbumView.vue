<template>
  <div>
    <q-page class="q-pa-md">
      <h1>Data Album</h1>
      <q-list>
        <q-item v-for="album in albums" :key="album.id" clickable @click="viewAlbum(album.id)">
          <q-card class="q-ma-sm" flat bordered>
            <q-card-section>
              <div class="row no-wrap items-center">
                <q-avatar>
                  <img :src="`https://i.pravatar.cc/150?img=${album.id}`" />
                </q-avatar>
                <div class="q-pl-md">
                  <q-item-label class="text-h6">{{ album.title }}</q-item-label>
                  <q-item-label caption>Album ID: {{ album.id }}</q-item-label>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-item>
      </q-list>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const albums = ref([])
const router = useRouter()

const fetchAlbums = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
    albums.value = response.data
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const viewAlbum = (id) => {
    router.push(`/album/${id}`)
}

onMounted(fetchAlbums)
</script>

<style scoped>
h1 {
  color: white;
  font-size: 50px;
  font-weight: 100px;
  text-align: center;
}

.q-avatar {
  width: 50px;
  height: 50px;
}

.q-item-label.caption {
  color: grey;
}
</style>
