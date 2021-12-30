<template>
  <div class="error">
    <div class="error__popup">
      <img class="error__icon" src="../assets/icons/error.png"/>
      <div class="error__close" @click="onCloseClick"></div>
      Ошибка:
      <span class="error__message">{{message}}</span>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name:'Error',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setIsBackIcon',
      'setErrorMessage',
    ]),
    onCloseClick() {
      this.setErrorMessage('')
    }
  }
}
</script>

<style>
.error {
  display: flex;
  background-color: rgba(0, 0, 0, .5); 
  position: fixed;
  top: 0px;
  left:0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 22px;
}
.error__popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 430px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  line-height: 17px;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
}

.error__icon{
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.error__close{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-image: url('../assets/icons/close.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.error__message{
  width: 100%;
  word-wrap: break-word;
  margin-top: 10px;
  text-align: center;
}

</style>