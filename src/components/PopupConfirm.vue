<template>
  <div class="popup">
        <div class="popup__form" name="form">
          <button type="button" class="popup__close"  @click="closePopup"></button>
          <h2 class="popup__form-title">{{popupType.title}}</h2>
          <div class="popup__buttons">
            <button
              type="submit"
              class="popup__button"
              @click='onConfirmClick'
            >
              Да
            </button>
            <button
              type="submit"
              class="popup__button"
              @click='onCancelClick'
            >
              Нет
            </button>
          </div>
        </div>
      </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'PopupConfirm',
  computed: {
    ...mapState([
      'popupType'
    ])
  },
  methods: {
    ...mapActions([
        'setPopupVisible',
        'setPopupType'
    ]),
    closePopup(){
      this.setPopupVisible(false)
    },
    onCancelClick() {
      this.popupType.popupFunctionCancel && this.popupType.popupFunctionCancel()
      this.setPopupVisible(false)
    },
    onConfirmClick() {
      this.popupType.popupFunction()
      this.setPopupVisible(false)
    }
  }
}
</script>

<style>

.popup{
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
  font-size: 18px;
}

.popup__form{
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  line-height: 17px;
  padding: 14px 36px 36px 36px;
  box-sizing: border-box;
}

.popup__close {
  width: 22px;
  height: 22px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: .3s;
  background-image: url('../assets/icons/close.png');
  background-size: contain;
  margin-left: auto;
}

.popup__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.popup__button{
  width: 40%;
  color: #000000;
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0.63);
  border-radius: 10px;
  color: rgb(255, 255, 255);
  margin-top: 40px;
  padding: 5px;
  font-size: 18px;
  z-index: 1;
  
}

@media (max-width:560px){
  .popup{
    padding: 0 20px;
    font-size: 14px;
  }
  .popup__close{
    width: 16px;
    height: 16px;
  }
  .popup__button{
    width: 35%;
    font-size: 14px;
  }
}
@media (max-width:425px){
  .popup__form{
    padding: 10px 20px 20px 20px;
  }
}

</style>