<template>
  <div class="header">
    <img class="header__logo" src='../assets/icons/todoList.png'/>
    <h1>Заметки</h1>
    <div class="header__button">
      <router-link to='/create' v-if="!isBackIcon" class="add" ></router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState([
      'isBackIcon',
      'items',
    ])
  },
  methods: {
    ...mapActions([
      'setIsBackIcon',
      'setPopupType',
      'setPopupVisible'
    ]),
  }
}
</script>

<style>
.header {
  max-width: 820px;
  width: 100%;
  text-align: center;
  font-size: 21px;
  background-color: rgb(242, 215, 250);
  padding: 5px;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.header__logo{
  width: 48px;
  height: 48px;
  padding: 2px;
}

.header__button {
  width: 48px;
  height: 48px;
}

.add {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(196, 141, 247);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-image: url('../assets/icons/addButtonWhite.png');
}

@media (max-width:425px){
  .header{
    font-size: 15px;
  }
}
</style>