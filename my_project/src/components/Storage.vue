<template>
	<div>
		<h1>{{msg}}</h1>

	</div>
</template>
<script >
import axios from 'axios'
	export default {
  name: 'Storage_1',
  data () {
    return {
      msg: 'This is Your Storage'
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