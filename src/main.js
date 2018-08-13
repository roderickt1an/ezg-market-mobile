// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import { Lazyload } from 'vant';
import axios from 'axios'
import VueBus from './common/vue-bus'
import { Toast } from 'vant';

import { Button, Table, Card } from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Card', Card);


Vue.use(VueBus);
Vue.use(Vant);
Vue.use(Lazyload);

Vue.prototype.$http = axios;
//  this.$http.get()
Vue.prototype.$Get = function (url, config, success) {
  let _self = this
  _self.$http.get(url, config).then(function (res) {
    if (res.data.msgCode == "40000") {
      success(res)
    } else {
      console.log(res)
      // fail(res)
      // _self.$toast.fail('系统错误！')
    }
  }).catch(function (err) {
    console.error(err)
    // _self.$toast.fail('网络错误！')
  })
}
//  this.$http.post()
Vue.prototype.$Post = function (url, config, success, fail) {
  let _self = this
  this.$http.post(url, config).then(function (res) {
    // _self.$backToLogin(res)
    if (res.data.msgCode == "40000") {
      if (res.data.msg) {
        // _self.$Message.success(res.data.msg)
      }
      success(res)
    } else {
      // _self.$Message.error(res.data.msg)
      fail(res)
      console.warn(res)
    }
  }).catch(function (err) {
    fail(err)
    // _self.$Message.error('网络异常！')
    console.error(err)
  })
}


Vue.prototype.$backTo = function () {
  this.$router.go(-1)
}
// this.$http.getDataCenter()
//  获取数据字典
Vue.prototype.$GetDataCenter = function (params, finish) {
  let _self = this
  let config = {
    params: {
      groupCodes: params
    }
  }
  // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
  let url = `api/system/tsType/queryTsTypeByGroupCodes`

  this.$http.get(url, config).then(function (res) {
    // _self.$backToLogin(res)
    if (res.data.msgCode == "40000") {
      finish(res)
    } else {
      // _self.$Message.error("请求异常！")
    }
  }).catch(function (err) {
    console.log(err)
    // _self.$Message.error("网络异常！")
  })
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
