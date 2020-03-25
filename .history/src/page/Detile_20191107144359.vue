<template>
  <div>
    <div class="title">
      <div>业务运单号：{{ this.json.trans_no}}</div>
      <p>运输时间：{{this.json.remark}}</p>
    </div>
    <div class="body"  v-for="(item,index) in this.json.biz_no_list" :key="index">
      <div class="title">
        单号：{{item.biz_no}}
      </div>
      <div >
        子单号：{{item.hawb_no}}/{{item.mawb_no}}
      </div>
    </div>  
  </div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "Detile",
  data() {
    return {
      json: ""
    };
  },

  created() {
    var data = { id: this.$route.query.id, type: 2 };
    httpcc
      .fetchGet("/Weixin/VehicleTasksServlet", data)
      .then(data => {
        this.json = JSON.parse(data[0].jsonString);
      })
      .catch(error => {
        MessageBox.alert(error, "提示");
      });
  },

  mounted() {},

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.title {
  padding: 10px;
  color: #ffffff;
  background: #26a2ff;
  opacity: 0.5;
  div {
    font-size: 17px;
  }
  p {
    margin-top: 5px;
  }
}
.body{
  width: 87%;
  margin: auto;
  margin-top: 20px;
  .title{
    font-size: 17px;
  }
}
</style>
