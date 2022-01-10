<template>
  <div class="item">
    <div class="item__title">
      {{item.title}}
      <div ref="progress" class="item__progress">
        <div class="item__progress-info">{{isProgressInfo}}</div>
      </div>
    </div>
    <div class="item__block">
      <div class="item__tasks" >
        <div v-for="(t, index) in item.tasks.slice(0, 3)"  :key="index" class="item__task" >
          <div :class="['task__title', t.completed && 'completed']">{{t.title}}</div>
        </div>
      </div>
      <div class="item__controls">
        <router-link tag='div' :to="{ name: 'edit', params: { id: this.index }}" class="edit item__control"></router-link>
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
  computed: {
    isTodoComplete() {
      return this.item.tasks.every(t => t.completed)
    },
    isProgressInfo() {
      return `${this.completedTaskCount}/${this.item.tasks.length}`
    },
    completedTaskCount() {
      return this.item.tasks.reduce((acc, curr) => {
        return acc + (curr.completed ? 1 : 0)
      }, 0)
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
      this.deleteItem(this.index)
    },
  },
  data() {
    return {
      Complete, 
      NotComplete,
    }
  },
  mounted() {
    let style = ''
    if (Math.floor(this.item.tasks.length / this.completedTaskCount) === 2) {
      style = 'linear-gradient(90deg, white 50%, transparent 50%)'
    } 
    else if (this.item.tasks.length === this.completedTaskCount) {
      style = 'none'
    }
    else if (this.completedTaskCount > this.item.tasks.length / 2) {
      style = `linear-gradient(${90 + (this.completedTaskCount / this.item.tasks.length * 100 - 50) * 3.6}deg, transparent 50%, rgb(196, 141, 247) 50%), linear-gradient(90deg, white 50%, transparent 50%)`
    }
    else {
      style = `linear-gradient(${90 + this.completedTaskCount / this.item.tasks.length * 100}deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)`
    }
    this.$refs.progress.style['background-image'] = style
  }
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

.item.completed {
  background-color: green;
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
  position: relative;
}

.item__progress {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background-color: rgb(196, 141, 247);
  display: flex;
  justify-content: center;
  align-items: center;
}

.item__progress-info {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(242, 215, 250);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__task {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0 5px 5px;
  border-bottom: 0.5mm ridge rgb(196, 141, 247, 0.8);
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