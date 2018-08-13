<template>
  <van-row  style="overflow-x:hidden">
    <van-nav-bar class="navBarStyle" title="订单服务" left-arrow click-left="$backTo()"/>

    <van-row style="width:80%;margin:auto;margin-top:40px">
      <van-cell-group>
        <div @click="open_search_company">
          <van-field v-model="company" placeholder="选择客户公司" />
        </div>
      </van-cell-group>
      <!-- <van-cell-group>
        <div @click="open_search_type">
          <van-field v-model="type" placeholder="选择客户状态" />
        </div>
      </van-cell-group> -->
      <van-cell-group style="margin-top:10px">
        <van-row :gutter="20">
          <van-col span="12">
            <div @click="open_time">
              <van-field v-model="payTime" placeholder="缴费时间" />
            </div>
          </van-col>
          <van-col span="12">
            <div @click="open_paydir">
              <van-field v-model="payDirName" placeholder="缴费方式" />
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group style="margin-top:10px">
        <van-row :gutter="20">
          <van-col span="12">
            <div>
              <van-cell v-model="totalMoney" />
            </div>
          </van-col>
          <van-col span="12">
            <div>
              <van-field v-model="hadPayMoney" placeholder="已付款" type="number" />
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group style="margin-top:10px;margin-bottom:20px">
        <div @click="open_area">
          <van-field v-model="areaName" placeholder="选择地区" />
        </div>
      </van-cell-group>

      <van-button size="large" type="primary" @click="open_product" style="background-color:#CC3300;border:1px solid #c30">新增产品</van-button>

      <van-cell-group style="margin-top:10px;margin-bottom:20px">
        <van-collapse v-model="activeNames" >
          <van-collapse-item title="有赞微商城" name="1">
            提供多样店铺模板，快速搭建网上商城
          </van-collapse-item>
          <van-collapse-item title="有赞零售" name="2">
            网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
          </van-collapse-item>
          <van-collapse-item title="有赞美业" name="3">
            线上拓客，随时预约，贴心顺手的开单收银
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>


      <van-tabbar style="margin-top:30px;">
        <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px;background-color:#CC3300" :loading="submit_loading" @click="submit">提交订单</van-button>
      </van-tabbar>
    </van-row>
    <company-select></company-select>
    <time-select></time-select>
    <pay-dir-select></pay-dir-select>
    <area-select></area-select>
    <product-detail></product-detail>
    <product-list></product-list>
    <!-- <customer-type-select></customer-type-select> -->
  </van-row>
</template>

<script>
import companySelect from '../woa-components/companyList'
import timeSelect from '../woa-components/timeSelect';
import payDirSelect from '../woa-components/paydirList'
import areaSelect from '../woa-components/areaSelect'
import productDetail from '../woa-components/productDetail'
import productList from '../woa-components/productList';
// import customerTypeSelect from '../woa-components/customerTypeSelect';

export default {
  components:{
    companySelect,
    timeSelect,
    payDirSelect,
    areaSelect,
    productDetail,
    productList,
    // customerTypeSelect
  },
  data(){
    return{
      // type:"",
      submit_loading:false,
      activeNames:[],
      company:"",
      companyID:"",
      payTime:"",
      payDirName:"",
      payDir:"",
      totalMoney:"订单总价",
      hadPayMoney:"",
      areaName:"",
      area:""
    }
  },
  methods:{
    open_search_company(){
      this.$Bus.emit('OPEN_COMPANY_LIST', true)
    },
    open_time(){
      this.$Bus.emit('OPEN_TIME', true)
    },
    open_paydir(){
      this.$Bus.emit('OPEN_PAYDIR', true)
    },
    open_area(){
      this.$Bus.emit('OPEN_AREA', true)
    },
    open_product(){
      this.$Bus.emit('OPEN_PRODUCT_LIST', true)
    },
    // open_search_type(){
    //   this.$Bus.emit('OPEN_TYPE',true)
    // },
    submit(){

    }
  },
  created(){
    let _self = this
    _self.$Bus.off('UPDATA_COMPANY')
    _self.$Bus.off('UPDATE_TIME')
    _self.$Bus.off('UPDATE_PAYDIR')
    _self.$Bus.off('UPDATE_AREA')
    _self.$Bus.on('UPDATA_COMPANY',(e) => {
      _self.companyID = e.id
      _self.company = e.companyname
    })
    _self.$Bus.on('UPDATE_TIME',(e)=>{
      _self.payTime = e
    })
    _self.$Bus.on('UPDATE_PAYDIR',(e)=>{
      _self.payDirName = e.text
      _self.payDir = e.typecode
    })
    _self.$Bus.on('UPDATE_AREA',(e)=>{
      console.log(e)
      _self.areaName = e[0].text + '-' + e[1].text
      _self.area = e[1].code
      console.log(_self.area)
    })
  }
}
</script>

<style>
.navBarStyle{
  color:white!important;
  background-color: #CC3300!important;
}
.van-nav-bar .van-icon{
  color:white!important
}
</style>

