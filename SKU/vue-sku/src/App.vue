<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div class="wrap wrap-sku">
      <div class="product-box">
        <div class="product-content">
          <div
            class="product-delcom"
            v-for="(ProductItem,n) in simulatedDATA.specifications"
            :key="n"
          >
            <p>{{ProductItem.name}}</p>
            <ul class="product-footerlist clearfix">
              <li
                v-for="(oItem,index) in ProductItem.item"
                :key="index"
                v-on:click="specificationBtn(oItem.name,n,$event,index)"
                v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']"
              >{{oItem.name}}</li>
            </ul>
          </div>
          <p v-if="price" class="price">¥{{price}}</p>
        </div>
        <div class="product-footer">
          <a href="javascript:">立即购买</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      simulatedDATA: {
        //模拟后台返回的数据 多规格
        difference: [
          {
            //所有的规格可能情况都在这个数组里
            id: "19",
            price: "200.00",
            stock: "19",
            difference: "100,白色"
          },
          {
            id: "20",
            price: "100.00",
            stock: "29",
            difference: "200,白色"
          },
          {
            id: "21",
            price: "300.00",
            stock: "10",
            difference: "100,黑色"
          },
          {
            id: "22",
            price: "900.00",
            stock: "0",
            difference: "200,黑色"
          },
          {
            id: "23",
            price: "600.00",
            stock: "48",
            difference: "100,绿色"
          },
          {
            id: "24",
            price: "500.00",
            stock: "40",
            difference: "200,绿色"
          },
          {
            id: "25",
            price: "90.00",
            stock: "0",
            difference: "100,蓝色"
          },
          {
            id: "26",
            price: "40.00",
            stock: "20",
            difference: "200,蓝色"
          }
        ],
        specifications: [
          {
            //这里是要被渲染字段
            name: "尺寸",
            item: [
              {
                name: "100"
              },
              {
                name: "200"
              }
            ]
          },
          {
            name: "颜色",
            item: [
              {
                name: "白色"
              },
              {
                name: "蓝色"
              },
              {
                name: "黑色"
              },
              {
                name: "绿色"
              }
            ]
          }
        ]
      },
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      price: "" //选中规格的价钱
    };
  },
  methods: {
    specificationBtn: function(item, n, event, index) {
      var self = this;
      if (self.selectArr[n] != item) {
        self.selectArr[n] = item;
        self.subIndex[n] = index;
      } else {
        self.selectArr[n] = "";
        self.subIndex[n] = -1; //去掉选中的颜色
      }
      self.checkItem();
    },
    checkItem: function() {
      var self = this;
      var option = self.simulatedDATA.specifications;
      var result = []; //定义数组储存被选中的值
      for (var i in option) {
        result[i] = self.selectArr[i] ? self.selectArr[i] : "";
      }
      for (var i in option) {
        var last = result[i]; //把选中的值存放到字符串last去
        for (var k in option[i].item) {
          result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
      }
      if (this.shopItemInfo[result]) {
        this.price = this.shopItemInfo[result].price || "";
      }
      self.$forceUpdate(); //重绘
    },
    isMay: function(result) {
      for (var i in result) {
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  },
  created: function() {
    var self = this;
    for (var i in self.simulatedDATA.difference) {
      self.shopItemInfo[self.simulatedDATA.difference[i].difference] =
        self.simulatedDATA.difference[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
    }
    self.checkItem();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.product-box {
  width: 1200px;
  display: block;
  margin: 0 auto;
}
.product-content {
  margin-bottom: 100px;
}
.product-delcom {
  color: #323232;
  font-size: 26px;
  border-bottom: 1px solid #eeeeee;
  padding: 30px 0;
}
.product-footerlist {
  margin-top: 10px;
}
.product-footerlist li {
  border: 1px solid #606060;
  border-radius: 5px;
  color: #606060;
  text-align: center;
  padding: 10px 30px;
  float: left;
  margin-right: 20px;
  cursor: pointer;
}
.product-footerlist li.productActive {
  background-color: #1a1a29;
  color: #fff;
  border: 1px solid #1a1a29;
}
.product-footerlist li.noneActive {
  background-color: #ccc;
  opacity: 0.4;
  color: #000;
  pointer-events: none;
}
.product-footer {
  background-color: #1a1a29;
  text-align: center;
}
.product-footer a {
  color: #fff;
  text-decoration: none;
  height: 88px;
  line-height: 88px;
  font-size: 28px;
}
.price {
  font-size: 30px;
  height: 60px;
  line-height: 60px;
}
</style>
