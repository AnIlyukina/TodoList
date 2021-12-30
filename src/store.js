import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { updateTodo, createTodo, deleteTodo, getTodos } from './fetcher'

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
      createItem: (state, payload) => {
        state.items.push(payload)
      },
      updateItem: (state, payload) => {
        state.items.splice(state.items.findIndex(i => i.id === payload.id), 1, payload)
      }
    },
    actions: {
      deleteItem: async ({ state, commit, dispatch }, payload) => {
        dispatch('setLoading', true)
        try {
          const response = await deleteTodo(state.items[payload].id)
          if (response.status === 200) {
            commit('deleteItem', payload)
          }
          else {
            console.log('error')
          }
        }
        catch(e) {
          console.log(e)
        }
        finally {
          dispatch('setLoading', false)
        }
      },
      createItem: async({ commit, dispatch }, payload) => {
        dispatch('setLoading', true)
        try{
          const response = await createTodo(payload)
          if (response.status === 200){
            const data = await response.json()
            commit('createItem', data)
          }
          else {
            console.log('error')
          }
        }
        catch(e) {
          console.log(e)
        }
        finally {
          dispatch('setLoading', false)
        }
      },
      updateItem: async ({ commit, dispatch }, payload) => {
        dispatch('setLoading', true)
        try {
          const response = await updateTodo(payload)
          if (response.status === 200) {
            commit('updateItem', payload)
          }
          else {
            console.log('error')
          }
        }
        catch(e) {
          console.log(e)
        }
        finally {
          dispatch('setLoading', false)
        }
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
      setItems: async ({ commit, dispatch }) => {
        dispatch('setLoading', true)
        try {
          const response = await getTodos()
          if (response.status === 200) {
            const data = await response.json()
            commit('setItems', data)
          }
          else {
            console.log('error')
          }
        }
        catch(e) {
          console.log(e)
        }
        finally {
          dispatch('setLoading', false)
        }
      },
      setLoading: (context, payload) => {
        context.commit('setLoading', payload)
      }
    }
  }
)