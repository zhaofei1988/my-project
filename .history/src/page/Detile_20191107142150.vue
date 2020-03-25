<template>
  <div class="bg"></div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "Detile",
  data() {
    return {
      
    };
  },

  created() {
  var data = { id: this.$route.query.id , type: 2 };
    httpcc
      .fetchGet("/Weixin/VehicleTasksServlet", data)
      .then(data => {
        this.datas=data;
      })
      .catch(error => {
        MessageBox.alert(error, "提示");
      });
  },

  mounted() {},

  methods: {
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.bg {
  height: 100%;
  width: 100%;
  background: #ffffff;
}
</style>
