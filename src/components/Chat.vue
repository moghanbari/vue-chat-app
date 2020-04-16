<template>
  <div class="chat">
    <div class="wrapper">
      <div class="container">
        <div class="right">
          <div class="top">
            <span>To: <span class="name">Everyone</span></span>
            <a href="javascript:;" v-on:click="logout" class="logout-button">Logout</a>
          </div>
          <div class="chat active-chat" data-chat="person2">
              <div class="conversation-start">
                  <span>Today, 5:38 PM</span>
              </div>
              <div
                v-for="chat in allMessages"
                v-bind:key="chat.message.id"
                :class="[chat.author.id === user.uid ? 'bubble me' : 'bubble you']"
              >
                {{chat.message.content}}
              </div>
          </div>
          <div class="write">
            <a href="" class="write-link attach"></a>
            <input
              type="text"
              v-model='message'
              @keyup.enter='saveMessage'
            >
            <a href="" class="write-link smiley"></a>
            <a href="" class="write-link send"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  name: 'Chat',
  data () {
    return {
      message: '' as string,
      allMessages: [] as Array<object>,
      user: {} as firebase.User
    }
  },
  methods: {
    saveMessage (): void {
      this.database.collection('chats').add({
        message: {
          id: this.generateGuid(),
          content: this.message
        },
        author: {
          id: this.user.uid,
          displayName: this.user.displayName
        },
        date: new Date()
      })

      // ToDo: figure out a way to put following line in 'then' part of db.collection
      this.message = ''
    },
    logout (): void {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    },
    saveNewUser (): void {
      const db = this.$store.state.db
      db.collection('users').add({
        userId: this.user.uid,
        displayName: this.user.displayName,
        avatarUrl: this.user.photoURL
      })
    },
    getMessages (): void {
      this.database.collection('chats').orderBy('date').onSnapshot((querySnapshot: Array<object>) => {
        this.allMessages = []
        querySnapshot.forEach((doc: any) => {
          this.allMessages.push(doc.data())
        })
      })
    },
    fillUser (): void {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user
        } else {
          this.user = {} as firebase.User
        }
      })
    },
    generateGuid (): string {
      return [
        this.generateRandomNumber(2),
        this.generateRandomNumber(1),
        this.generateRandomNumber(1),
        this.generateRandomNumber(1),
        this.generateRandomNumber(3)
      ].join('-')
    },
    generateRandomNumber (count: number) {
      let out = ''

      for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }

      return out
    }
  },
  created () {
    this.fillUser()
    this.getMessages()
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login')
      }
    })
  },
  computed: {
    database: function () {
      return this.$store.state.db
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../assets/style/chat.scss';
</style>
