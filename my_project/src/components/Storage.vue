<template>
	<div>
		<h1>{{msg}}</h1>
    <form class="form-horizontal center">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">仓库名</label>
    <div class="col-sm-8">
      <input type="text"  v-model="storage_text" class="form-control"  placeholder="Storage_name">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">地点</label>
    <div class="col-sm-8">
      <input type="text" v-model="place_text" class="form-control"  placeholder="Place">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-1 col-sm-10">
      <button class="btn btn-info sign  btn-lg" v-on:click="insert_storage">添加 新的仓库</button>
    </div>
  </div>
</form>
<table class="com-table">
    <thead>
    <tr>
        <th >地点</th>
        <th >仓库名</th>
        <th >删除</th>
    </tr>
    </thead>
    <tbody v-if = "items">
      <tr  v-for="item in items" @click ="turn_to_location(item._id)" >
        <td class="title" >{{ item.location }}</td>
        <td class="title" >{{ item.name }}</td>
        <td class="del"><span @click.stop ="del_storage(item._id)">   X</span></td>
    </tr>
    </tbody>
</table>
	</div>
</template>
<script >
import axios from 'axios'
	export default {
  name: 'Storage_1',
  data () {
    return {
      msg: 'This is Storages',
      storage_text:"",
      place_text:"",
      items:null
    }
  },
  created: function () {
    // `this` 指向 vm 实例 确认是否登录
    var arr,reg=new RegExp("(^| )username=([^;]*)(;|$)");
     if(arr=document.cookie.match(reg))
     this.username = unescape(arr[2]);
      if(this.username != "null"&&this.username != undefined ){
        this.msg = "This is Your Storage";
      }else{
        alert("请先登录！！")
        this.$router.push('/login');
      }
      //查询仓库列表数据库
      axios.post('/api/select_warehouse').then((res)=>{
        if(!res.data.code){
          this.items = res.data.list;
        }
      })
  },
  methods:{
    insert_storage:function(event){//添加仓库信息
      var params = {};
        params.name = this.storage_text;
        params.location = this.place_text;
        if(params.name == ""||params.location ==""){
          alert("请输入完整的信息");
          return;
        }
        axios.post('/api/insert_warehouse',params).then((res)=>{
          if(!res.data.code){
            alert("添加成功");
            this.storage_text = "";
            this.place_text = "";
            this.check_info();
          }
        })
    },
    turn_to_location:function(id){//跳转到库位页面
     this.$router.push('/storage/location?'+id);
    },
    del_storage(id){
      //查询仓库中是否有物品
      var is_Del = true;
      var params = {};
      params.warehouse_id = id;
      axios.post('/api/select_location',params).then((res)=>{
          if(!res.data.code){
           res.data.msg.forEach((curr,index)=>{
              if(curr.is_empty == 0){
                is_Del = false;
              }
           })
          }
          if(is_Del){
            //删除对应的数据
              var params = {};
              params._id = id;
              axios.post('/api/del_storage',params).then((res)=>{//根据_id删除对应库位信息
                  if(!res.data.code){
                    alert("删除成功");
                    this.check_info();
                  }
              })
            }else{
              alert("仓库中仍有商品，请先出库所有商品");
            }
        }).catch((err)=>{//查询不到连接字符串的ID 的对应的仓库则返回
           if(is_Del){
            //删除对应的数据
              var params = {};
              params._id = id;
              axios.post('/api/del_storage',params).then((res)=>{//根据_id删除对应库位信息
                  if(!res.data.code){
                    alert("删除成功");
                    this.check_info();
                  }
              })
            }else{
              alert("仓库中仍有商品，请先出库所有商品");
            }
          })
      
    },
    check_info(){
      // `this` 指向 vm 实例 确认是否登录
    var arr,reg=new RegExp("(^| )username=([^;]*)(;|$)");
     if(arr=document.cookie.match(reg))
     this.username = unescape(arr[2]);
      if(this.username != "null"&&this.username != undefined ){
        this.msg = "This is Your Storage";
      }else{
        alert("请先登录！！")
        this.$router.push('/login');
      }
      //查询仓库列表数据库
      axios.post('/api/select_warehouse').then((res)=>{
        if(!res.data.code){
          this.items = res.data.list;
        }
      })
    }
  }
}
</script>
<style scoped>
	h1, h2 {
  font-weight: normal;
}
.center{
  width: 1200px !important;
  margin: auto;
}
.form-control{
  background-color: #1E2D42;
}
.sign{
  background-color: #132232;
  border: 1px solid #0f3356;
}
.com-table{
  width: 1200px;
  margin: auto;
  color: white;
}
.com-table thead th{
  text-align: center;
  font-size: 24px;
}
.com-table tbody tr:hover{
    background: -webkit-linear-gradient(top, #a7cfdf 0%,#23538a 48%,#23538a 58%);
    cursor: pointer;
}
.com-table tbody tr td{
    border-bottom: 1px solid #E6E6E6;
    height: 50px;
}
</style>