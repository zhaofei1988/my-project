<template>
  <div class="bg"></div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "OpenIdLoding",
  data() {
    return {
      
    };
  },

  created() {
    let code = this.getUrlKey("code");
    this.id=code
    if (code) {
      var codeData = { codes: code };
      httpcc
        .fetchPost("/Weixin/OpenIdServlet", codeData)
        .then(data => {
           MessageBox.alert(JSON.stringify(data), "提示");
          if (data.code == 2) {
            this.$router.replace({
              path: "/DriverBinding",
              query: { openid: data.openid }
            });
          } else if (data.role_type == "DRIVER") {
            this.$router.replace({
              path: "/VehicleTasksServlet",
              query: { phone: data.phone }
            });
          }else{
             MessageBox.alert("您不是司机，或者您还没有备注，如果您没有备注请找相关人员备注", "提示");
          }
        })
        .catch(error => {
          MessageBox.alert(error, "提示");
        });
    } else {
      this.getCodeApi("123");
    }
  },

  mounted() {},

  methods: {
    getCodeApi(state) {
      //获取code
      let urlNow = encodeURIComponent(window.location.href);
      let scope = "snsapi_userinfo"; //snsapi_userinfo   //静默授权 用户无感知
      let url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe25642e162c700c4&redirect_uri=" +
        urlNow +
        "&response_type=code&scope=" +
        scope +
        "&state=" +
        state +
        "#wechat_redirect";
      window.location.replace(url);
    },
    getUrlKey(name) {
      //获取url 参数
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
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
