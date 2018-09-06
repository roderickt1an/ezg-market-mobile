<template>
  <div>
    <van-popup v-model="productListShow" style="width:100%;height:100%">
      <van-nav-bar class="navBarStyle" title="产品列表" left-arrow @click-left="productListShow=false"/>
      <van-search placeholder="请输入产品名称" v-model="searchProduct" @search="get_all_product" />
      <div class="wrapper" style="height:600px;overflow-y:scroll;width:25%;float:left" ref="wrapper" >
        <van-badge-group :active-key="activeKey" class="content">
          <van-badge @click="onClick(item,index)" v-for="(item, index) in productList" :key="index" :title="item.product"/>
        </van-badge-group>
      </div>
      <div style="height:600px;overflow-y:scroll;float:left;width:75%">
        <van-row v-for="(item,index) in productType" :key="index" style="margin-top:10px;margin-bottom:10px">
          <van-row style="margin-top:10px">{{item.name}}</van-row>
          <van-radio-group v-model="radio[index]">
            <van-col span="12" v-for="(type, index) in item.children" :key="index" style="padding:5px;height:60px">
              <van-radio :name="type.pvId" :key="index">{{type.propertyValue}}</van-radio>
            </van-col>
          </van-radio-group>

        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

export default {
  data(){
    return{
      searchProduct:"",
      value:"",
      activeKey:"",
      productListShow:false,
      productList: [],
      productType: [],
      producSku: [],
      radio:[]
    }
  },
  methods:{
    onClick(item, index) {
      // console.log(item, index)
      this.activeKey = index;
      this.get_product_type(item.id)
      this.get_product_sku(item.id)
    },
    get_all_product(){
      let _self = this
      let url = `api/product/list`
      let config = {
        params: {
          page: 1,
          pageSize: 1000,
          product:_self.searchProduct
        }
      }

      function success(res){
        _self.productList = res.data.data.rows
        _self.productList.push({
          id:"000000",
          product:"暂无"
        })
      }

      this.$Get(url, config, success)
    },
    get_product_type(e){
      let _self = this
      let url = `api/product/queryPropertyByProductId`

      let config = {
        params:{
          productId: e
        }
      }

      function success(res){
        console.log(res.data.data)
        _self.productType = res.data.data
      }

      this.$Get(url, config, success)
    },
    get_product_sku(e){
      let _self = this
      let url = `api/product/getSKUListByProductId`
      let config = {
        params:{
          productId: e
        }
      }

      function success(res){
        console.log(res.data.data)
        _self.producSku = res.data.data
      }

      this.$Get(url, config, success)
    },
    get_product_price_by_sku(){

    }
  },
  created(){
    let _self = this
    this.$Bus.on("OPEN_PRODUCT_LIST",(e)=>{
      _self.productListShow = true
      _self.get_all_product()
    })
  }
}
</script>

<style>
.van-radio__input{
  line-height:1;
}
.van-radio__label{
  width: 100px;
}
.van-col-12{
  display: flex;
  justify-content: center;
  align-items:center
}
</style>

