<template>
  <div class="todolist">
    <div class="items">
      <transition-group name="fade">
        <Item v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Item from './Item.vue'

export default {
  name: 'TodoList',
  components: {
    Item,
  },
  computed: {
    ...mapState(['items']),
  },
  methods: {
    ...mapActions([
      'setItems',
      'setLoading',
      'setIsBackIcon'
    ])
  },
  async mounted() {
    this.setIsBackIcon(false)
    this.setItems()
  },
}
</script>

<style >
.todolist {
  max-width: 820px;
  width: 100%;
  display: flex; 
  flex-direction: column;
  padding: 20px 5px;  
  overflow-y: auto;
}
.items {
  width: 100%;
}


</style>