<template>
  <div >
    
  </div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "Detile",
  data() {
    return {
      json:''
    };
  },

  created() {
  var data = { id: this.$route.query.id , type: 2 };
    httpcc
      .fetchGet("/Weixin/VehicleTasksServlet", data)
      .then(data => {
        this.json=JSON.parse(data[0].jsonString);
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

</style>
