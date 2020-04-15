<template>
  <div class="chat">
    <div class="wrapper">
    <div class="container">
        <div class="left">
            <div class="top">
                <input type="text" placeholder="Search">
                <a href="javascript:;" class="search"></a>
            </div>
            <ul class="people">
                <li class="person" data-chat="person1">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="">
                    <span class="name">Thomas Bangalter</span>
                    <span class="time">2:09 PM</span>
                    <span class="preview">I was wondering...</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="top"><span>To: <span class="name">Dog Woofson</span></span></div>
            <div class="chat" data-chat="person1">
                <div class="conversation-start">
                    <span>Today, 6:48 AM</span>
                </div>
                <div class="bubble you">
                    Hello,
                </div>
                <div class="bubble you">
                    it's me.
                </div>
                <div class="bubble you">
                    I was wondering...
                </div>
            </div>
            <div class="chat active-chat" data-chat="person2">
                <div class="conversation-start">
                    <span>Today, 5:38 PM</span>
                </div>
                <div
                  v-for="singleMessage in allMessages"
                  v-bind:key="singleMessage.author.id"
                  :class="[singleMessage.author.id === user.uid ? 'bubble me' : 'bubble you']"
                >
                  {{singleMessage.message}}
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
    saveMessage () {
      const db = this.$store.state.db
      db.collection('chat').add({
        message: this.message,
        date: new Date(),
        author: {
          id: this.user.uid,
          displayName: this.user.displayName
        }
      })

      // ToDo: figure out a way to put following line in 'then' part of db.collection
      this.message = ''
    },
    getMessages (): void {
      const db = this.$store.state.db
      db.collection('chat').orderBy('date').onSnapshot((querySnapshot: any) => {
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
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../assets/style/chat.scss';
</style>
