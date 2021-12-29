import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store(
  {
    state: {
      popupVisible: false,
      isBackIcon: false,
      popupType: {},
      items: [],
      loading: false,
    },
    mutations: {
      deleteItem: (state, payload) => {
        state.items.splice(payload, 1)
      },
      setPopupVisible: (state, payload) => {
        state.popupVisible = payload
      },
      deleteTaks: (state, payload) => {
        state.items[payload.itemId].tasks.splice(payload.taskId, 1)
      },
      setIsBackIcon: (state, payload) => {
        state.isBackIcon = payload
      },
      setPopupType: (state, payload) => {
        state.popupType = payload
      },
      setItems: (state, payload) => {
        state.items = payload
      },
      setLoading: (state, payload) => {
        state.loading = payload
      },
    },
    actions: {
      deleteItem: (context, payload) => {
        context.commit('deleteItem', payload)
      },
      setPopupVisible: (context, payload) => [
        context.commit('setPopupVisible', payload)
      ],
      deleteTask: (context, payload) => {
        context.commit('deleteTask', payload)
      },
      setIsBackIcon: (context, payload) => {
        context.commit('setIsBackIcon', payload)
      },
      setPopupType: (context, payload) => {
        context.commit('setPopupType', payload)
      },
      setItems: (context, payload) => {
        context.commit('setItems', payload)
      },
      setLoading: (context, payload) => {
        context.commit('setLoading', payload)
      }
    }
  }
)