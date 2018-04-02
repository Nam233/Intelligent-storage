<template>
  <div class="hello">
    <h1>{{ msg }}</h1>    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Intelligent storage'
    }
  },
  created: function () {
    // `this` 指向 vm 实例
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
