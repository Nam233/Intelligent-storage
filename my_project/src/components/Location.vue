<template>
  <div >
    <h1>{{ msg }}</h1> 
    <form class="form-horizontal center">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">库位名</label>
    <div class="col-sm-8">
      <input type="text"  v-model="location_text" class="form-control"  placeholder="Location_name">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-1 col-sm-10">
      <button class="btn btn-info sign  btn-lg" @click = "insert_location">添加 新的库位</button>
    </div>
  </div>
</form> 
<table class="com-table">
    <thead>
    <tr>
        <th >库位名</th>
        <th >空闲状态</th>
        <th >删除</th>
    </tr>
    </thead>
    <tbody v-if = "items">
      <tr  v-for="item in items"  @click = "show_location_info(item._id,item.is_empty)">
        <td class="title" >{{ item.name }}</td>
        <td class="title" >{{ item.is_empty == 1?"空":"占用" }}</td>
        <td class="del"><span @click.stop ="del_location(item._id,item.is_empty)">   X</span></td>
    </tr>
    </tbody>
</table>  
 <!--打钱专用模态框-->
      <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">商品二维码信息</h4>
            </div>
            <div class="modal-body">
              <p>请使用QRcode APP扫描该二维码</p>
              <p>商品名:{{good_name}}</p>
              <img :src = "img" height="1704" width="1242" style="width:270px;height:270px;">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Location',
  data () {
    return {
      msg: 'Welcome to  storage location',
      location_text:"",
      items:null,
      img:"",
      good_name:""
    }
  },
  created: function () {
    //查询仓库
    var params = {};
    params._id = window.location.href.substr(-24,24).trim();
    axios.post('/api/select_warehouse',params).then((res)=>{//查询对应
          if(res.data.code == 0){
            // alert("查询成功");
            this.msg = "Welcome to "+ res.data.list[0].name;
            // 查询仓库库位
              params = {};
              params.warehouse_id = window.location.href.substr(-24,24).trim();
              axios.post('/api/select_location',params).then((res)=>{
                    if(!res.data.code){
                      this.items = res.data.msg;
                    }
                  })
          }
        }).catch((err)=>{//查询不到连接字符串的ID 的对应的仓库则返回
           alert("请从仓库列表点击进入此页面")
           this.$router.push('/storage');
          })
    
  },
  methods:{
    insert_location:function(e){//添加仓库库位消息
       var _id = window.location.href.substr(-24,24).trim();
       var params = {};
        params.name = this.location_text;
        params.is_empty = 1;
        params.warehouse_id = _id;
        if(params.name == ""){
          alert("请输入库位名");
          return;
        }
        axios.post('/api/insert_location',params).then((res)=>{
          if(!res.data.code){
            alert("添加成功");
            this.location_text = "";
            this.flush_info();
          }
        })
    },
    flush_info(){
      //查询仓库
    var params = {};
    params._id = window.location.href.substr(-24,24).trim();
    axios.post('/api/select_warehouse',params).then((res)=>{//查询对应
          if(res.data.code == 0){
            // alert("查询成功");
            this.msg = "Welcome to "+ res.data.list[0].name;
            // 查询仓库库位
              params = {};
              params.warehouse_id = window.location.href.substr(-24,24).trim();
              axios.post('/api/select_location',params).then((res)=>{
                    if(!res.data.code){
                      this.items = res.data.msg;
                    }
                  })
          }
        }).catch((err)=>{//查询不到连接字符串的ID 的对应的仓库则返回
           alert("请从仓库列表点击进入此页面");
           this.$router.push('/storage');
          })
    },
    del_location(id,is_empty){
      //删除对应的数据
      if(is_empty == 1){
        var params = {};
      params._id = id;
      axios.post('/api/del_location',params).then((res)=>{//根据_id删除对应库位信息
          if(!res.data.code){
            alert("删除成功");
            this.flush_info();
          }
      })
    }else{
      alert("库位上有货物，不能删除库位");
    }
    },
    show_location_info(id,is_empty){
      if(is_empty == 1){
        alert("库位上空空如也");
        return
      }
      var params = {};
      params.storage_location_id = id;
      axios.post('/api/select_inventory',params).then((res)=>{//查询库位存储信息
          if(!res.data.code){
           var goods_id = res.data.msg[0].goods_id;
           var params = {};
            params.cont = goods_id;
            axios.post('/api/QRcode',params).then((res)=>{//获取商品ID二维码
              if(!res.data.code){
                this.img = res.data.msg;
                var params = {};
                params._id = goods_id;
                axios.post("/api/select_goodByid",params).then((res)=>{//获取商品名显示模态框
                    if(!res.data.code){
                      this.good_name = res.data.msg[0].name;
                      $('#myModal').modal('toggle');
                    }
                })
              }
          })
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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