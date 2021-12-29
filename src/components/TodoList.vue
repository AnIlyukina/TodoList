<template>
  <div class="todolist">
    <div class="items">
      <Item v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Item from './Item.vue'
import { getTodos } from '../fetcher'

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
    this.setItems(await getTodos(this.setLoading))
  },
}
</script>

<style >
.todolist {
  max-width: 820px;
  width: 100%;
  display: flex; 
  flex-direction: column;
  padding: 20px 0 ;  
}
.items {
  width: 100%;
}


</style>