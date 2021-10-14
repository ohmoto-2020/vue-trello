import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1IcHJGj84Wj2fbN-FzY8AMu88n4dCzSk",
  authDomain: "vue-tollero-b09cd.firebaseapp.com",
  projectId: "vue-tollero-b09cd",
  storageBucket: "vue-tollero-b09cd.appspot.com",
  messagingSenderId: "304517318437",
  appId: "1:304517318437:web:f553dafe68b1524d0dbccc",
  measurementId: "G-RK5MTBYVF1"
};

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
