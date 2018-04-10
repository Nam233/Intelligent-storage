<template>
	<div>
		<h1>{{msg}}</h1>
		<form class="form-horizontal center">
		  <div class="form-group">
		    <label for="inputEmail3" class="col-sm-2 control-label">商品名称</label>
		    <div class="col-sm-8">
		      <input type="text"  v-model="goods_text" class="form-control"  placeholder="商品名称">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail3" class="col-sm-2 control-label">商品批次</label>
		    <div class="col-sm-8">
		      <input type="text"  v-model="batch_text" class="form-control"  placeholder="商品批次">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail3" class="col-sm-2 control-label">商品数量</label>
		    <div class="col-sm-8">
		      <input type="number"  v-model="good_num" class="form-control"  placeholder="商品数量">
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-1 col-sm-10">
		      <button class="btn btn-info sign  btn-lg" @click = "insert_good">添加 新的商品</button>
		    </div>
		  </div>
		</form> 
		<table class="com-table">
		    <thead>
		    <tr>
		        <th >商品名</th>
		        <th >批次</th>
		        <th >数量</th>
		        <th >操作</th>
		        <th >删除</th>
		    </tr>
		    </thead>
		    <tbody v-if = "items">
		      <tr  v-for="item in items"  @click = "show_good_info(item._id)">
		        <td class="title" >{{ item.name }}</td>
		        <td class="title" >{{ item.batch }}</td>
		        <td class="title" >{{ item.number }}</td>
		        <td class="del"><span @click.stop = "erweima(item._id)" >查看二维码</span> </td>
		        <td class="del"><span @click.stop = "del_good(item._id)" >X</span></td>
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
		            <img :src = "img" height="1704" width="1242" style="width:270px;height:270px;">
		          </div>
		          <div class="modal-footer">
		            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		          </div>
		        </div><!-- /.modal-content -->
		      </div><!-- /.modal-dialog -->
		    </div><!-- /.modal -->
		    <div class="modal fade bs-example-modal-lg" tabindex="-1" id="myLargeModalLabel" role="dialog" aria-labelledby="myLargeModalLabel">
			  <div class="modal-dialog modal-lg" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title">商品信息</h4>
		          </div>
		          <div class="modal-body">
		            <p>当前状态</p>
		            <div v-if = "is_inlocation">位于<span>{{now_location_space}}</span>的<span>{{now_storage}}</span>中的<span>{{now_location}}</span></div>  
		            <div v-else>当前不在库中</div>  
		          </div>
		          <div class="modal-body">
		            <p>历史状态</p>
		            <p v-if = "history_items">
		            	<div v-for="h_item in history_items" >
		            		于<span>{{h_item.history_create}}~--~{{h_item.history_delete}}</span>位于<span>{{h_item.history_location_space}}</span>的<span>{{h_item.history_storage}}</span>中的<span>{{h_item.history_location}}</span>
		            	</div>  
		            </p>
		            
		          </div>
		          <div class="modal-footer">
		            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		          </div>
			    </div>
			  </div>
			</div>
		 </div>
	</div>
	


</template>
<script >
import axios from 'axios'
	export default {
  name: 'Goods',
  data () {
    return {
      msg: 'This is Your Goods page',
      goods_text:"",
      batch_text:"",
      good_num:"",
      items:null,
      img :"",
      now_storage:"",
      now_location:"",
      now_location_space:"",
      history_items:[],
      is_inlocation:true
    }
  },
  created: function () {
  	// `this` 指向 vm 实例 确认是否登录
    var arr,reg=new RegExp("(^| )username=([^;]*)(;|$)");
     if(arr=document.cookie.match(reg))
     this.username = unescape(arr[2]);
      if(this.username != "null"&&this.username != undefined ){
        this.msg = "This is Your Goods page";
      }else{
        alert("请先登录！！")
        this.$router.push('/login');
      }  
    axios.get("/api/select_allgoods").then((res)=>{
    	if(!res.data.code){
    		this.items = res.data.msg;
    	}
    })   
  },
  methods:{
  	insert_good(){
  		var params = {};
        params.name = this.goods_text;
        params.batch = this.batch_text;
        params.number = Number(this.good_num);
        if(params.name == ""||params.batch == ""||params.number == ""){
        	alert("请输入完整的信息");
        }
        axios.post('/api/insert_good',params).then((res)=>{
          if(!res.data.code){
            alert(res.data.msg);
            this.goods_text = "";
            this.batch_text = "";
            this.good_num = "";
            this.flush_info();
          }
        })
  	},
  	flush_info(){
  		axios.get("/api/select_allgoods").then((res)=>{
    	if(!res.data.code){
    		this.items = res.data.msg;
    	}
    })  
  	},
  	del_good(id){
  	//	select_inventory
  	  var params = {};
      params.goods_id = id;
      axios.post("/api/select_inventory",params).then((res)=>{//先判断 商品是否在库中
      	if(!res.data.code){
            if(res.data.msg.length == 0){
            	 var params = {};
			      params._id = id;
			      axios.post('/api/del_good',params).then((res)=>{//根据_id删除对应库位信息
			          if(!res.data.code){
			            alert("删除成功");
			            this.flush_info();
			          }
			      })
			  }else{
			  	alert("商品在库中，请先出库");
			  }
          }
      })
  	 
  	},
  	erweima(id){
  		var params = {};
      	params.cont = id;
      	axios.post('/api/QRcode',params).then((res)=>{//根据_id删除对应库位信息
          if(!res.data.code){
            this.img = res.data.msg;
            $('#myModal').modal('toggle');
          }
      })
  	},
  	show_good_info(id){
  		var params = {};
		params.goods_id = id;
  		axios.post('/api/select_inventory',params).then((res)=>{//根据商品查询库位ID
          if(!res.data.code){
            var params = {};
            if(res.data.msg.length == 0){
            	this.history_info_make(id);
            	this.is_inlocation  =false;
            	return
            }
			this.is_inlocation  =true;
            params._id = res.data.msg[0].storage_location_id;
            axios.post('/api/select_location',params).then((res)=>{//根据库位ID查仓库ID
            	if(!res.data.code){
            		this.now_location = res.data.msg[0].name;
            		var params = {};
            		params._id = res.data.msg[0].warehouse_id;
            		axios.post("/api/select_warehouse",params).then((res)=>{//查询仓库信息
            			if(!res.data.code){
            				this.now_storage  = res.data.list[0].name;
            				this.now_location_space  = res.data.list[0].location;
            				this.history_info_make(id);
            				
            			}
            		})
            	}
            })        
          }
      })
  		
  	},
  	history_info_make(id){
  		this.history_items = [];
  		var params = {};
		params.goods_id = id;
		axios.post("/api/select_history_inventory",params).then((res)=>{//查询商品历史信息表获取一个对象数组
			if(!res.data.code){
				if(!res.data.msg.length ||res.data.msg.length == 0){
					$('#myLargeModalLabel').modal('toggle');
				}
				for(let i = 0,l = res.data.msg.length||0;i<l;i++){
					let history_create = res.data.msg[i].careat_at;
					let history_delete = res.data.msg[i].delete_at;
					let params = {};
					params._id = res.data.msg[i].storage_location_id;
					axios.post("/api/select_location",params).then((res)=>{
						if(!res.data.code){
							let history_location = res.data.msg[0].name;
							let params = {};
							params._id  = res.data.msg[0].warehouse_id;
							axios.post("/api/select_warehouse",params).then((res)=>{
								if(!res.data.code){		
								let history_location_space = res.data.list[0].location;					
								let history_storage = res.data.list[0].name;						
									this.history_items.push({history_location,history_location_space,history_storage,history_create,history_delete});
									$('#myLargeModalLabel').modal('show')
									
								}
							})
						}
					})
				}
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
.modal-body span{
	margin: 10px;
}
</style>