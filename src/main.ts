import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
require('firebase/firestore')

const firebaseConfig = {
  apiKey: 'AIzaSyAREZJLJe6tcLv8aaI_Fu2a0jyA1mBXUEk',
  authDomain: 'vue-chat-app-302a3.firebaseapp.com',
  databaseURL: 'https://vue-chat-app-302a3.firebaseio.com',
  projectId: 'vue-chat-app-302a3',
  storageBucket: 'vue-chat-app-302a3.appspot.com',
  messagingSenderId: '533852356530',
  appId: '1:533852356530:web:d40f08d76ca7f8a011eeab',
  measurementId: 'G-3HME0Q9ZF8'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const db = firebase.firestore()
store.dispatch('loadDb', db)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
