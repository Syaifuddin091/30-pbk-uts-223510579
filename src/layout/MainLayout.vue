<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container class="bg-secondary">
      <q-header class="bg-primary text-white" height-hint="100">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title></q-toolbar-title>
          <q-toolbar-title class="toolbar-title-left"></q-toolbar-title>
          <div class="q-tabs-container">
            <q-tabs align="center">
              <q-route-tab to="/Home" label="Home" />
              <q-route-tab to="/Todo" label="Todo" />
              <q-route-tab to="/Post" label="Post" />
              <q-route-tab to="/Album" label="Album" />
            </q-tabs>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="fixed-drawer"
      >
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="../assets/profile2.jpg">
            </q-avatar>
            <div class="text-weight-bold">S.Ibnu Romadhon</div>
            <div>223510579</div>
          </div>
        </q-img>

        <q-list padding style="margin-top: 150px; border-right: 1px solid #ddd; height: calc(100% - 150px); overflow: hidden;">
          <q-item clickable v-ripple to="/Home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Home
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Todo">
            <q-item-section avatar>
              <q-icon name="checklist" />
            </q-item-section>
            <q-item-section>
              Todo
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Post">
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>
            <q-item-section>
              Post
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Album">
            <q-item-section avatar>
              <q-icon name="photo_album" />
            </q-item-section>
            <q-item-section>
              Album
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white fixed-footer" height-hint="98">
      <q-toolbar class="footer-toolbar">
        <q-toolbar-title class="footer-title">
          Copyright © S.Ibnu Romadhon®. All rights reserved.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

.toolbar-title-left {
  margin-right: auto;
  font-family: 'Poppins', sans-serif;
}

.q-tabs-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

q-toolbar-title {
  text-align: center;
  display: flex;
  font-family: "Poppins";
}

.footer-toolbar {
  display: flex;
  justify-content: center;
}

.footer-title {
  font-family: "Poppins";
  text-align: center;
}

.fixed-drawer {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
