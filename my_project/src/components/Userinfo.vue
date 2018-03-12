<template>
	<div>
		<h1>{{msg}}</h1>
		 <router-link to="/" style="color:pink;">Go to Index</router-link>
	</div>
	

</template>
<script >
	export default {
  name: 'Userinfo',
  data () {
    return {
      msg: 'This is Your personal info page'
    }
  },
  created: function () {
    // `this` 指向 vm 实例
  },
  methods:{
  }
}
</script>
<style>
	h1, h2 {
  font-weight: normal;
}
</style>