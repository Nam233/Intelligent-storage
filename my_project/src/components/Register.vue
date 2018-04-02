<template>
	<div class="main">
		<!--注册-->
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-xs-7 col-xs-offset-3 col-md-offset-4 col-lg-4 col-lg-offset-4 well">
					<h1 class="text-left">已有账号？<a href="/#/login">直接登录</a></h1>
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
						<input type="text" placeholder="账号" class="form-control" v-model="username" id="user_txt" name="">
					</div>
					<p>支持字母、数字、"-" "_"的组合，5-20个字符</p>
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-lock"></i>
						</span>
						<input type="password" placeholder="密码" class="form-control" v-model="psw" id="psw_txt" name="">
					</div>
					<p>字母、数字和符号两种及以上的组合，6-20个字符</p>
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-lock"></i>
						</span>
						<input type="password" placeholder="确认密码" class="form-control" v-model="psw_again" id="psw_again" name="">
					</div>
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-user"></i>
						</span>
						<input type="text" placeholder="真实姓名(选填)" v-model="realName" class="form-control" name="">
					</div>
					<input type="submit" class="btn btn btn-info form-control" id="_btn" @click="register" value="注  册">
				</div>
			</div>
		</div>
		<router-link to="/" style="color:pink;">Go to Index</router-link>
	</div>
	
</template>
<script>
import axios from 'axios';
export default {
  name: 'Register',
  data () {
    return {
      username:"",
      psw:"",
      psw_again:"",
      realName:""
    }
  },
  created: function () {
  },
  methods:{
  	register(){
  		if(this.username == ""){
  			alert("请输入用户名！");
  			return
  		}
  		if(this.psw =="" ){
  			alert("请输入密码!");
  			return
  		}else if(this.psw_again !=this.psw){
  			alert("两次输入密码请一致");
  			this.psw_again = ""
  			return
  		}
  		var params = {};
        params.username = this.username;
        params.pwd = this.psw;
        if(this.realName == ""){
        	params.name = "匿名"
        }else{
        	params.name = this.realName;
        }
        var username = this.username;
  		axios.post('/api/regist',params).then((res)=>{//后台注册数据库查证
          if(!res.data.code){
          		alert("注册成功")
          		this.$router.push({ path: `/login?user=${username}` })//注册的值传到登录页面
            	// this.$router.push({ name: 'Login', params: { user }});
          }else if(res.data.code == 1){
          	alert(res.data.msg);
          	return
          }else{
          	alert("注册失败");
          	return
          }
        })
  	}
  }
}
</script>

<style scoped>
.main {
  height: 800px;
  width: 100%;
  box-shadow:0px 4px 16px rgba(2, 2, 36,.7) inset; 
  background: url(../../static/img/login_bg.jpg) no-repeat fixed center center;
  background-size:1920px 1080px;
  overflow: hidden;
}

.main .container {
  margin: 0 auto;
  margin-top: 250px;
}

.main .container .well {
  border: none;
  background: #121C27;
  opacity: 0.95;
}

.main .container .well .text-left {
  color: #0b84d3;
  font-size: 16px;
}

.main .container .well .input-group {
  margin: 15px auto;
}

.main .container .well .input-group .input-group-addon {
  background-color: #132232;
  border: 1px solid #0f3356;
}

.main .container .well .input-group .input-group-addon i {
  color: #0385d4;
}

.main .container .well .input-group .form-control {
  border: 1px solid #0f3356;
  background-color: #132232;
}

.main .container .well .btn {
  background-color: #184c86;
  border: none;
}

.main .container .well p {
  color: #acacac;
  font-size: 12px;
}

</style>