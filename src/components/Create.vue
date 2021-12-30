<template>
  <div class="create">
    <div v-if="isBackIcon" class="back" @click="onBackClick"></div>
    <h2 class="create__title">{{!this.$route.params.id ? 'Новая заметка:' : 'Изменить заметку'}}</h2>
    <div class="create__form" >
      <input v-model="item.title" name="todoName" class ='create__input create__input_type_title' placeholder="Название" />
      <div class="create__tasks" v-for="(t, index) in item.tasks" :key="index">
          <button :class="['create__button', t.completed && 'completed']" @click="() => onCompleted(index)"></button>
          <textarea ref="inputTask" @input='onInput' v-model="item.tasks[index].title"  class ='create__input create__input_type_task' placeholder="Задача" />
          <button :class="['create__button create__button_type_delete', item.tasks.length === 1 && 'disabled']" @click="() => onDeleteClick(index)"></button> 
      </div>
      <div class="create__change">
        <button ref="buttonAdd" class="create__button create__button_type_add" @click="onAddTaskClick"></button>
        <button :class="['create__button-save', !modelValid && 'disabled']" @click="onSaveClick">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Create',
  props: {
    itemId: {
      type: Number,
      required: false
    }
  },
  
  data() {
    return {
      item: {
        title: '',
        tasks: [{title: '', completed: false}],
      }
    }
  },

  validations: {
    item: {
      title: {
        required
      },
      tasks: {
        required,
        $each: {
          title: {
            required
          }
        }
      }
    }
  },

  computed: {
    ...mapState([
      'items',
      'popupType',
      'isBackIcon'
    ]),
    modelValid() {
      return !this.$v.item.$invalid && !this.$v.item.tasks.$invalid
    },
    onEditScreen() {
      return this.$route.path.includes('/edit')
    }
  },

  methods: {
    ...mapActions([
      'setPopupVisible',
      'setIsBackIcon',
      'setPopupType',
      'setLoading',
      'setItems',
      'createItem',
      'updateItem'
    ]),
    onAddTaskClick() {
      this.item.tasks.push({title: '', completed: false})
    },
    async onSaveClick() {
      if (!this.onEditScreen) {
        if (this.modelValid) {
          this.createItem(this.item)
          this.$router.push('/')
        }
      }
      else {
        if (this.modelValid) {
          console.log(this.item)
          this.updateItem(this.item)
          this.$router.push('/')
        }
      }
    },
    delete(index) {
      this.item.tasks.splice(index, 1)
    },
    onDeleteClick(index){
      if (this.item.tasks.length > 1) {
        this.setPopupType({
          title: 'Удалить задачу?',
          popupFunction: () => this.delete(index)
        })
        this.setPopupVisible(true)
      }
    },
    resizeTextArea(target) {
      target.style.height ='auto'
      target.style.height =`${target.scrollHeight}px`
    },
    onInput(e){
      this.resizeTextArea(e.target)
    },
    onCompleted(index){
      this.item.tasks[index].completed = this.item.tasks[index].completed ? false : true
    },
    async save(item) {
      if (this.onEditScreen) {
        this.updateItem(item)
      }
      else {
        this.createItem(item)
      }
      this.$router.push('/')
    },
    cancel() {
      this.$router.push('/')
    },
    onBackClick() {
      if (this.modelValid) {
        this.setPopupType({
          title: 'Сохранить изменения?',
          popupFunction: () => this.save(this.item),
          popupFunctionCancel: () => this.cancel()
        })
        this.setPopupVisible(true)
      }
      else {
        this.$router.push('/')
      }
    }
  },
  async mounted() {
    this.setIsBackIcon(true)
    if (this.$route.path.includes('/edit')) {
      await this.setItems()
      this.item = this.items[this.$route.params.id]
    }
  },
} 
</script>

<style>
.create {
  display: flex;
  flex-direction: column;
  max-width: 820px;
  width: 100%;
  position: relative;
}
.create__title{
  padding: 5px;
}
.create__input{
  max-width: 700px;
  width: 100%;
  padding: 10px;
  margin: 7px;
  background-color: transparent;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
}

.create__input_type_title{
  margin: 0 0 0 37px;
}

.create__input_type_task{
  height: auto;
  outline: none;
  overflow: auto;
}

.create__form {
  display: flex;
  flex-direction: column;
}

.create__change{
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 15px;
  margin-right: 59px;
}

.create__button_type_add{
  background-image: url('../assets/icons/addButtonBlack.png');
  margin-right: 15px;

}

.create__button_type_delete{
  transition: opacity 0.3s ease-in-out;
  margin-left: auto;
  background-image: url('../assets/icons/delete.png');
}

.create__button.completed {
  background-image: url('../assets/icons/completed.png');
}

.create__button-save{
  max-width: 100px;
  width: 100%;
  height: 40px;
  border: none;
  background-color: rgb(196, 141, 247);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  align-self: flex-end;
  transition: opacity 0.3s ease-in-out;
}

.disabled {
  opacity: 0.5;
}

.create__tasks {
  display: flex;
  position: relative;
  flex-direction: row;
}

.create__button{
  max-width: 30px;
  width: 100%;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid #0000008e;
  cursor: pointer;
  align-self:center;
  background-position: center;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgb(196, 141, 247);
  right: 5px;
  top: -53px;
  background-image: url('../assets/icons/back.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  transition: opacity 0.3s ease-in-out;
}

@media (max-width:768px){
  .create__input_type_title{
    margin: 0 0 0 0px;
  }
  .create__change{
    margin-right: 30px;
  }
}
</style>