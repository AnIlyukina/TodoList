<template>
  <div class="item">
    <div class="item__title">{{item.title}}</div>
    <div class="item__block">
      <div class="item__tasks" >
        <div v-for="(t, index) in item.tasks.slice(0, 3)"  :key="index" class="item__task" >
          <div :class="['task__title', t.completed && 'completed']">{{t.title}}</div>
        </div>
      </div>
      <div class="item__controls">
        <div class="edit item__control" @click="onEditClick"></div>
        <div class="delete item__control" @click="onDeleteClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Complete from '../assets/icons/complete.png'
import NotComplete from '../assets/icons/notcomplete.png'

export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'deleteItem',
      'setPopupVisible',
      'setPopupType',
      'setLoading',
    ]),

    onDeleteClick() {
      this.setPopupType({
        title: 'Удалить заметку?',
        popupFunction: this.delete
      })
      this.setPopupVisible(true)
    },

    async delete() {
      // await deleteTodo(this.item.id, this.setLoading)
      this.deleteItem(this.index)
    },

    onEditClick() {
      this.$router.push(`/edit/${this.index}`)
    },
  },
  data() {
    return {
      Complete, 
      NotComplete,
    }
  },
}
</script>

<style>
.item {
  width: 100%;
  box-shadow: 0px 0px 5px 2px rgba(34, 60, 80, 0.1);
  border-radius: 20px;
  display: flex;
  margin-bottom: 15px;  
}

.item:last-child {
  margin-bottom: 0px;
}
.item__block{
  display: flex;
  flex-direction: row;
  width: calc(100% - 270px);  
  flex: 1 0 auto;
}

.item__tasks {
  font-size: 20px;
  flex: 1 0 auto;
  width: calc(100% - 324px); 
  padding: 15px 5px 15px 0px;   
}

.item__title {
  font-size: 20px;
  flex: 1 0 270px;
  max-width: 270px;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 15px;
  background-color: rgb(242, 215, 250);
  border-radius: 20px;
  justify-content: center;
  text-align: center;
}
.item__task {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0 5px 5px;
  border-bottom: 0.5mm ridge rgb(196, 141, 247, 0.8) ;
}

.task__title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task__title.completed {
  color: rgba(0, 0, 0, 0.411);
  text-decoration: line-through;
}

.task__completition {
  width: 20px;
  height: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 10px;
}

.item__controls {
  padding: 15px;
  flex: 0 0 54px;
}

.item__control{
  width: 32px;
  height: 32px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
.edit {
  background-image: url('../assets/icons/edit.png');
  margin-bottom: 15px;
}
.delete {
  background-image: url('../assets/icons/delete.png');
}

@media (max-width:560px){
  .item{
    display: flex;
    flex-direction: column;
  }
  .item__control{
    width: 24px;
    height: 24px;
  }
  .item__title{
    max-width: 540px;
    width: 100%;
    font-size: 16px;
    flex: 0 0 auto;
  }
  .item__tasks{
    font-size: 16px;
  }
  .item__block {
    width: 100%;
  }
}
</style>