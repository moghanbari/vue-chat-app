<template>
  <div class="login-form">
    <p>This is login form</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginForm',
  props: {
    msg: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
