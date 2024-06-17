<template>
    <q-page class="bg-secondary home-page">
      <div class="profile-container">
        <div class="profile-info">
            <h1>S. Ibnu Romadhon</h1>
            <img src="../assets/profile.png" alt="" class="profile-image">
              <div class="paragraft">
              <p>NPM : 223510579</p>
              <p>Kelas : 4E</p>
              <p>Prodi : Teknik Informatika</p>
              <p>Fakultas Teknik</p>
            </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  // Tidak ada script tambahan yang dibutuhkan
  </script>
  
  <style scoped>

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  
  .profile-info {
    font-family: 'Poppins', sans-serif;
  }
  
  .profile-info h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
  
  .profile-info p {
    margin-top: 10px;
    font-size: 16px;
    color: white;
  }

  .profile-image{
    width: 200px;
    height: auto;
  }
  </style>
  