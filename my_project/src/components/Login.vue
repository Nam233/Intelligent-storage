<template>  
  <div class="content">
    <!--登录框-->
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-xs-7 col-xs-offset-3 col-md-offset-4 col-lg-4 col-lg-offset-4 well">
          <h1 class="text-center">欢迎用户登录</h1>
          <div class="input-group">
            <span class="input-group-addon">
              <i class="glyphicon glyphicon-user"></i>
            </span>
            <input type="text" placeholder="用户名"  v-model = "username" id="uesr_txt" class="form-control" name="">
          </div>
          <div class="input-group">
            <span class="input-group-addon">
              <i class="glyphicon glyphicon-lock"></i>
            </span>
            <input type="password" placeholder="密码" v-model = "psw" id="psw_txt" class="form-control" name="">
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" checked="checked" id="check" v-model="check_state" @click = "change_check">我已经阅读并同意<span data-toggle="modal" data-target="#myModal" >"网络服务协议"</span>
            </label>
          </div>
          <input type="button" id="login_btn" class="btn btn btn-info form-control" value="登录"  @click = "login">
          <div class="server"><span><a href="/#/register">免费注册</a></span><span>忘记密码</span></div>
          <p>—————————— 一键登录 ——————————</p>
        </div>
      </div>
    </div>
    <router-link to="/" style="color:pink;">Go to Index</router-link>
    <!--打钱专用模态框-->
    <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">网络服务协议</h4>
          </div>
          <div class="modal-body">
            <p>没啥协议，但是可以给我打钱</p>
            <img src="../../static/img/payme.png" height="1704" width="1242" style="width:270px;height:400px;">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
 </div>
</template>

<script >
  import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username :"",
      psw:"",
      check_state:false
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    this.username = this.$route.query.user;//注册过来的值。
  },
  methods:{
      login(){//点击登录按钮功能
        window.event.returnValue = false;
        if(!this.check_state){
          alert("请阅读'网络服务协议'！");
          return;
        }
        var params = {};
        params.username = this.username;
        params.pwd = this.psw;
        axios.post('/api/login',params).then((res)=>{
          if(!res.data.code){
            alert(res.data.msg);
            if(res.data.code == 0){
              document.cookie="username="+this.username;
              this.$router.push('/')
            }
          }
        })
      },
      change_check(){//checkbox选中
          this.check_state = !this.check_state;
      }
    }
}
</script>

<style scoped>
.content {
  height: 800px;
  overflow: hidden;
  box-shadow:0px 4px 16px rgba(2, 2, 36,.7) inset; 
 background: url(../../static/img/login_bg.jpg) no-repeat fixed center center;
  background-size:1920px 1080px;
}

.content .container {
  margin: 0 auto;
  margin-top: 250px;
  opacity: 0.95;
}

.content .container .well {
  border: 1px solid #0f3356;
  background: #121C27;
}

.content .container .well .text-center {
  color: #0b84d3;
  font-size: 18px;
}

.content .container .well .input-group {
  margin-top: 15px;
}

.content .container .well .input-group .input-group-addon {
  background-color: #132232;
  border: 1px solid #0f3356;
}

.content .container .well .input-group .input-group-addon i {
  color: #0385d4;
}

.content .container .well .input-group .form-control {
  border: 1px solid #0f3356;
  background-color: #132232;
}

.content .container .well .checkbox label {
  color: white;
  float: left;
  margin-top: 10px;
}

.content .container .well .checkbox label span {
  color: #0b84d3;
}

.content .container .well .btn {
  background-color: #184c86;
  margin-top: 10px;
  border: none;
}

.content .container .well .server {
  color: #0b84d3;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.content .container .well .server span {
  cursor: pointer;
}

.content .container .well p {
  color: white;
}

.content .container .well > a {
  display: block;
  width: 80px;
  height: 66px;
  margin: 10px auto;
}

</style>