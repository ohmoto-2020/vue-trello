import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: null,
    lists: []
  },
  mutations: {
    addList(state, payload) {
      state.lists.push(payload)
    },
    removeList(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCard(state, payload) {
      state.lists[payload.listIndex].cards.push(payload.title)
    },
    removeCard(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
      state.lists = payload.lists
    },
    setLoginUser(state, user) {
      state.loginUser = user
    },
    deleteLoginUser(state) {
      state.loginUser = null
    }
  },
  actions: {
    addList({ getters, commit }, title) {
      firebase.firestore().collection(`users/${getters.uid}/lists/`).add({ title: title, cards: [] }).then(function (res) {
        commit(`addList`, { id: res.id, title: title, cards: [] })
      })
    },
    removeList({ getters, commit }, payload) {
      firebase.firestore().collection(`users/${getters.uid}/lists/`).doc(payload.listId).delete().then(function () {
        commit(`removeList`, payload.listIndex)
      })
    },
    addCard({ state, commit }, payload) {
      firebase.firestore().collection(`users/${state.loginUser.uid}/lists/`).doc(payload.listId).update({
        cards: firebase.firestore.FieldValue.arrayUnion(payload.title)
      }).then(() => {
        commit('addCard', payload)
      })
    },
    removeCard({ state, commit }, payload) {
      const newCards = state.lists[payload.listIndex].cards.filter((_, index) => {
        return index != payload.cardIndex
      })
      firebase.firestore().collection(`users/${state.loginUser.uid}/lists/`).doc(payload.listId).update({
        cards: newCards
      }).then(() => {
        commit('removeCard', payload)
      })
    },
    updateList({ getters, commit }, payload) {
      firebase.firestore().collection(`users/${getters.uid}/lists/`).get().then(function (res) {
        let index = 0
        res.forEach((doc) => {
          doc.ref.update({
            title: payload.lists[index].title,
            cards: payload.lists[index].cards
          })
          index++
        })
      })
      commit('updateList', payload)
    },
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(() => {
        router.push('/')
      })
    },
    logout() {
      firebase.auth().signOut()
    },
    fetchLists({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/lists`).get().then(function (res) {
        res.forEach(function (doc) {
          commit('addList', { id: doc.id, title: doc.data().title, cards: doc.data().cards })
        })
      })
    }
  },
  modules: {
  },
  getters: {
    uid(state) {
      return state.loginUser ? state.loginUser.uid : null
    }
  }
})
