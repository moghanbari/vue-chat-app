<template>
  <div class="login-form">
    <p>This is login form</p>
    <button @click="login">Login with google</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  name: 'LoginForm',
  methods: {
    login () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

      firebase.auth().signInWithPopup(provider).then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken
        // The signed-in user info.
        // const user = result.user
        this.$router.push('/')
      }).catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.log(errorCode + errorMessage + email + credential)
      })
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
