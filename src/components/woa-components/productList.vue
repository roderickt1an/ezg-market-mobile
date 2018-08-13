<template>
  <div>
    <van-popup v-model="productListShow" style="width:100%;height:100%">
      <van-nav-bar class="navBarStyle" title="产品列表" left-arrow @click-left="productListShow=false"/>
      <van-cell-group>
        <van-cell value="内容">
          <div slot="right-icon">
            <van-icon name="add-o" />
          </div>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      productListShow:false,
      productList:[],
    }
  },
  methods:{
  },
  created(){
    let _self = this
    this.$Bus.on("OPEN_PRODUCT_LIST",(e)=>{
      _self.productListShow = true
    })
  }
}
</script>

