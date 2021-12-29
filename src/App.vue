<template>
  <div class="app">
    <Header />
    <PopupConfirm v-if="popupVisible"/>
    <Loader v-if="loading"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Header from './components/Header.vue'
import Loader from './components/Loader.vue'
import PopupConfirm from './components/PopupConfirm.vue'

export default {
  name: 'App',
  components: {
    Header,
    PopupConfirm,
    Loader,
  },
  computed: {
    ...mapState([
      'popupVisible', 
      'items',
      'loading'
    ])
  },
  methods: {
    ...mapActions([
      'setIsBackIcon',
    ])
  },
  watch: {
    $route(to) {
      if (to.path === '/') {
        this.setIsBackIcon(false)
      }
    }
  }
}
</script>

<style>
body, * {
  margin: 0;
  padding: 0;
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  min-width: 320px;
}
</style>
