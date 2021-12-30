<template>
  <div class="app">
    <Header />
    <transition name="fade" >
      <PopupConfirm v-if="popupVisible"/>
    </transition>
    <transition name="fade" >
      <Loader v-if="loading"/>
    </transition>
    <transition name="fade" >
      <Error v-if="errorMessage" :message="errorMessage"/>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import Header from './components/Header.vue'
import Loader from './components/Loader.vue'
import Error from "./components/Error.vue"
import PopupConfirm from './components/PopupConfirm.vue'

export default {
  name: 'App',
  components: {
    Header,
    PopupConfirm,
    Loader,
    Error
  },
  computed: {
    ...mapState([
      'popupVisible', 
      'items',
      'loading',
      'errorMessage'
    ])
  },
  methods: {
    ...mapActions([
      'setIsBackIcon',
      'setErrorMessage',
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
  padding: 20px 10px 20px 10px;
  min-width: 320px;
}

.fade-enter,.fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
</style>
