<template>
  <div id="app">
    <header>
      <div class="con">
        <span>
          欢迎来到智能仓储管理平台
        </span>
      <ul>
        <li class="login_reg" v-if= "login_state" ><span @click = "turn_to_userinfo" style="margin-right: 10px;">欢迎 {{username}} </span> <a href="#" @click = "logout"> 注销</a></li>
        <li class="login_reg" v-else><a href="/#/login">请登录</a> <a href="/#/register">免费注册</a></li>
        <li>帮助中心</li>
        <li>联系我们</li>
        <li @click = "turn_to_userinfo" >个人信息</li>
        <li @click = "turn_to_mystorage">我的仓库</li>
        <li @click = "turn_to_mygoods">我的货品</li>
      </ul>
    </div>
    </header>
    <router-view/>
    <footer>
      <div class="text">Powered By Songyufeng</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      username:"",
      login_state:false
    }
  },
  created: function () {//从cookie读取登录状态
     var arr,reg=new RegExp("(^| )username=([^;]*)(;|$)");
     if(arr=document.cookie.match(reg))
     this.username = unescape(arr[2]);
      if(this.username != "null"&&this.username != undefined ){
        this.login_state = true;
      }
  },
  watch: {
   '$route' (to, from) {
     var arr,reg=new RegExp("(^| )username=([^;]*)(;|$)");
     if(arr=document.cookie.match(reg))
     this.username = unescape(arr[2]);
      if(this.username != "null"&&this.username != undefined ){
        this.login_state = true;
      }
   }
 },
  methods:{
    logout(){
      document.cookie="username=null";
      this.login_state = false;
      window.location.reload();
    },
    turn_to_userinfo(){
      this.$router.push('/user');
    },
    turn_to_mystorage(){
      this.$router.push('/storage');
    },
    turn_to_mygoods(){
      this.$router.push('/good');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1E2D42;
}
body{
   background: #111922;
}
header{
  height: 40px;
  background: rgba(18, 28, 39, .8);
  box-shadow: 0 4px 20px 2px rgba(0, 0, 0,.7)
}
header .con{
  margin: auto;
  text-align: center;
  width: 1200px;
  color: #C9C9C9;
  line-height: 40px;
}
header .con span{
  float: left;
}
header a {
  color: #3c8a0d;
}

header a:hover {
  color: #c9c9c9;
}


header  ul {
  margin: 0;
  line-height: 40px;
  float: right;
}

header  li {
  float: left !important;
  margin: 0 12px;
  cursor: pointer;
  font-size: 12px;
  list-style: none;
}

header  li:hover {
  color: white;
}
footer{

    background: #111922;
    overflow: hidden;
    box-shadow:0px 6px 16px rgba(0, 0, 0,.7) inset; 
}
footer .text{
  height: 100px;
  line-height: 180px;
}
</style>
