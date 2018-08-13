<template>
  <div>
    <van-popup v-model="productDetailShow" style="width:100%">
      <Card>
        <div class="productDetail-title">
          <p id="product_name">{{basePropertys[0].product}}</p>
          <p class="productDetail-title-price">
            <span>￥<strong id="product_price">加载中</strong></span>
          </p>
          <div class="productDetail-title-content">
          </div>
        </div>
        <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
          <div class="_propertys_class_" v-for="(item, index) in basePropertys" :key=index>
            <p :id="item.propertyId">{{ item.name }}</p>
              <div class="productDetail-option-buttonList" :name="index==0?'firstProperty':''">
                <button
                  type="button"
                  v-for="(item2, index2) in item.children"
                  :key = index2
                  :class="index2==0?'active':''"
                  :id="item2.pvId"
                  @click="chooseThisProperty(item2.pvId)">
                {{ item2.propertyValue }}
                </button>
              </div>
          </div>
          <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="addProduct">立即购买</Button>
        </div>
      </Card>
    </van-popup>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data(){
    return{
      productDetailShow:false,
      basePropertys:[
        {
          product: "软著",
          children: [
            {
              pvId: 350,
              propertyValue: "需编写",
              selected: 1,
              ppvId: 472
            },
            {
              pvId: 351,
              propertyValue: "有代码",
              selected: 1,
              ppvId: 473
            }
          ],
          name: "软著代码",
          propertyId: 109
        },
        {
          product: "软著",
          children: [
            {
              pvId: 339,
              propertyValue: "3",
              selected: 1,
              ppvId: 474
            },
            {
              pvId: 340,
              propertyValue: "4",
              selected: 1,
              ppvId: 475
            },
            {
              pvId: 341,
              propertyValue: "5",
              selected: 1,
              ppvId: 476
            },
            {
              pvId: 342,
              propertyValue: "7-10",
              selected: 1,
              ppvId: 477
            },
            {
              pvId: 343,
              propertyValue: "11-15",
              selected: 1,
              ppvId: 478
            },
            {
              pvId: 344,
              propertyValue: "17-20",
              selected: 1,
              ppvId: 479
            },
            {
              pvId: 345,
              propertyValue: "22-25",
              selected: 1,
              ppvId: 480
            },
            {
              pvId: 346,
              propertyValue: "27-30",
              selected: 1,
              ppvId: 481
            },
            {
              pvId: 347,
              propertyValue: "31-35",
              selected: 1,
              ppvId: 482
            },
            {
              pvId: 348,
              propertyValue: "36-40",
              selected: 1,
              ppvId: 483
            },
            {
              pvId: 349,
              propertyValue: "45以上",
              selected: 1,
              ppvId: 484
            }
          ],
          name: "软著工作日",
          propertyId: 108
        }
      ]
    }
  },
  methods:{
    addProduct(){

    },
    areaChange() {
      let _self = this
      let obj = _self.getPropertyIdArray()
      if (obj.areaId != _self.lastObj.areaId) {
        _self.lastObj = obj
        if(_self.res1[1] == "441900"){
          _self.res1[2] = "441906"
        }
        _self.setPrice(_self.SKU, _self.res1[2])
        //属性值改变
      } else if (obj.linkPropertyValueIds.join(',') != _self.lastObj.linkPropertyValueIds.join(',')) {
        _self.lastObj = obj
        let button = $("div[name='firstProperty']").find("button[class='active']")
        if (button[0].id != _self.lastFirstPropertyValue) {
          _self.lastFirstPropertyValue = button[0].id
          let _sku_p_value, _sku_p, i, j
          if (_self.productSKU) {
            for (i = 0, j = _self.productSKU.length; i < j; i++) {
              _sku_p_value = _self.productSKU[i].linkPropertys    //属性值
              _sku_p = _self.productSKU[i].linkPropertyIds      //属性ID
              if (_sku_p_value.indexOf(_self.lastFirstPropertyValue) >= 0) {
                _self.resetProperty(_sku_p_value, _sku_p)    //重置属性
                break
              }
            }
          }
        }
        _self.setPrice()
      } else {}
    },
    getPropertyIdArray() {
      let _self = this
      let obj = {}
      let areaId = _self.res1[2]
      let linkPropertyValueIds = []
      let linkPropertyIds = []
      $("._propertys_class_").each(function (i, obj) {
        if ($(obj).css("display") != "none") {
          let div = $(obj).find("div")
          linkPropertyIds.push(div[0].id)
          let button = $(obj).find("button[class='active']")
          linkPropertyValueIds.push(button[0].id)
        }
      });
      obj.linkPropertyValueIds = linkPropertyValueIds
      obj.linkPropertyIds = linkPropertyIds
      obj.areaId = areaId
      return obj
    },
    setPrice(skuId, areaId) {
      let _self = this
      if (!skuId) {
        let linkPropertyArray = _self.lastObj.linkPropertyValueIds
        let _sku_p_value, _sku_p, i, j, flag
        if (_self.productSKU) {
          for (i = 0, j = _self.productSKU.length; i < j; i++) {
            _sku_p_value = _self.productSKU[i].linkPropertys   //属性值
            //长度一致
            if (linkPropertyArray.join(",").length == _sku_p_value.length) {
              flag = _self.checkStrInArray(_sku_p_value, linkPropertyArray);
              //内容都包含
              if (flag) {
                skuId = _self.productSKU[i].id;
                break;
              }
            }
          }
        }
      }
      if (!skuId) {
        _self.currentSKUId = null;
        _self.price = 0;
        $("#product_price").html("未知")
      } else {
        _self.SKU = skuId
        _self.currentSKUId = skuId
        let url = '/product/getPriceByAreaAndSKU?skuId=' + skuId + '&areaId=' + _self.res1[2]
        function doSuccess(response) {
          if (response.data.data && response.data.data != []) {
            let baseprice = response.data.data[0].baseprice
            let oaprice = response.data.data[0].oaprice
            _self.price = oaprice
            $("#product_price").html(oaprice)
          } else {
            $("#product_price").html("未知")
          }
        }
        this.GetData(url, doSuccess)
      }
    },
    checkStrInArray(_sku_p_value, linkPropertyArray) {
      let m, n
      if (linkPropertyArray.length > 0) {
        for (m = 0, n = linkPropertyArray.length; m < n; m++) {
          //不包含
          if (_sku_p_value.indexOf(linkPropertyArray[m]) < 0) {
            return false
          }
        }
      return true
      }
    return false
    },
    resetProperty(linkPropertyValueIds, linkPropertyIds) {
      let _self = this
      let propertyValueIds = linkPropertyValueIds.split(",")
      let propertyIds = linkPropertyIds.split(",")

      $('._propertys_class_').hide()

      for (let i = 0; i < propertyIds.length; i++) {
        $('#' + propertyIds[i]).parent().show()

          if ($('#' + propertyIds[i]).parent().attr("name") == 'firstProperty') {
            _self.lastFirstPropertyValue = propertyValueIds[i]
          }
          _self.chooseThisProperty(propertyValueIds[i])
        }
      _self.lastObj = _self.getPropertyIdArray()		//设置缓存对象
    },
    chooseThisProperty(id) {
      $(document.getElementById(id)).parent().find("button").removeClass("active")
      $(document.getElementById(id)).addClass("active")
    },
  }
}
</script>

<style scoped>
@import 'iview/dist/styles/iview.css';
@import './productDetail.min.css';
</style>



