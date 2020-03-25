<template>
  <div>
    <div class="list-item" v-for="(item,index) in datas" :key="index" @click="jump(item.vehTaskId)">
      <p class="waybill-sty">{{transNo}}{{item.transNo}}</p>
      <p>{{transType}}{{item.transTypeName}}</p>
      <p>{{vehNo}}{{item.vehNo}}</p>
      <p>{{driver}}{{item.driver}}</p>
      <p>{{routeName}}{{item.routeName}}</p>
      <p>{{remark}}{{item.remark}}</p>
      <p>
        {{status}}
        <span v-if="item.status==0">请尽快到app接单</span>
        <span v-if="item.status==1">订单已经发送到app</span>
        <span v-if="item.status==2">正在运输</span>
      </p>
    </div>
  </div>
</template>

<script>
import httpcc from "../https.js";
import { log } from "util";
import { MessageBox } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      datas: "",
      transNo: "运单号：",
      transType: "运输类型：",
      vehNo: "车牌号：",
      driver: "司机：",
      routeName: "运输路线：",
      remark: "运输时间：",
      status: "货物状态："
    };
  },

  created() {
    var data = { phone: this.$route.query.phone, type: 1 };
    // var data = { phone: '15038806717', type: 1 };
    httpcc
      .fetchGet("/Weixin/VehicleTasksServlet", data)
      .then(data => {
        this.datas = data;
      })
      .catch(error => {
        MessageBox.alert(error, "提示");
      });
  },

  mounted() {},

  methods: {
    jump(id) {
      this.$router.push({
        path: "/Detile",
        query: { id: id }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.list-item {
  width: 87%;
  margin: auto;
  background: #26a2ff;
  opacity: 0.5;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #fff;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  p {
    margin-top: 5px;
  }
}
.waybill-sty {
  font-size: 17px;
}
</style>
