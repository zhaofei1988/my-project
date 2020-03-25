<template>
  <div>
    <div>
      <div class="input-name1">微信openID</div>
      <div class="input1">
        <input type="text" v-model="id" disabled="disabled" />
      </div>
      <div class="input-name2">请输入登录恒联app的手机号</div>
      <div class="input1">
        <input
          type="number"
          onKeydown="if(value.length >= 11){return false}"
          placeholder="输入手机号"
          v-model="mobiles"
        />
      </div>
      <div class="input2">
        <input
          type="number"
          onKeydown="if(value.length >= 6){return false}"
          placeholder="请输入验证码"
          v-model="code"
        />
        <div @click="sendCode">{{codeText}}</div>
      </div>
      <div class="button" @click="bingding">绑 定</div>
    </div>
  </div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "ClientBinding",
  data() {
    return {
      mobiles: "",
      id: "",
      code: "",
      codeText: "发送验证码",
      codeM: 60,
      cilck: true
    };
  },

  created() {
    // let code = this.getUrlKey("code");
    // if (code) {
    //   var codeData = { codes: code };
    //   httpcc
    //     .fetchPost("/Weixin/OpenIdServlet", codeData)
    //     .then(data => {
    //       this.id = data.openid;
    //     })
    //     .catch(error => {
    //        MessageBox.alert(error, "提示");
    //     });
    // } else {
    //   this.getCodeApi("123");
    // }
  },

  mounted() {},

  methods: {
    sendCode() {
      if (this.cilck == false) {
        return false;
      }
      this.timer = setInterval(() => {
        if (this.codeM > 0) {
          this.codeM--;
          this.codeText = this.codeM + "秒";
          this.cilck = false;
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.codeM = 60;
          this.codeText = "重新发送";
          this.cilck = true;
        }
      }, 1000);
    },
    bingding() {
      var jobj = { mobile: this.mobiles, openid: this.id,type:1 };
      httpcc
        .fetchPost("/Weixin/BindingServlet", jobj)
        .then(data => {
          if (data.code == 2) {
            MessageBox.alert(
              "你的手机号没有备注，请联系相关人员进行备注",
              "提示"
            );
          }else if (data.code == 1) {
            this.$router.push({ path: "/BindingSuccess" ,query: {type: 1}});
          }else{
             MessageBox.alert(data.message,
              "提示"
            );
          }
        })
        .catch(error => {
          MessageBox.alert(error, "提示");
        });
    },
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
.input-name1 {
  margin-top: 100px;
  text-align: center;
  font-size: 16px;
}
.input-name2 {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
}
.input1 {
  margin: auto;
  margin-top: 20px;
  input {
    padding-left: 10px;
    padding-right: 10px;
    border: 1.5px solid #26a2ff;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    width: 80%;
    margin-left: 10%;
    background: #fff;
  }
}
.input2 {
  margin-top: 20px;
  input {
    padding-left: 10px;
    padding-right: 10px;
    border: 1.5px solid #26a2ff;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    width: 40%;
    margin-left: 10%;
  }
  div {
    color: #fff;
    background: #26a2ff;
    text-align: center;
    height: 40px;
    font-size: 13px;
    line-height: 40px;
    width: 32%;
    border-radius: 5px;
    float: right;
    margin-right: 7%;
  }
}
.button {
  width: 83%;
  margin-left: 10%;
  background: #26a2ff;
  border-radius: 5px;

  margin-top: 20px;
  text-align: center;
  height: 45px;
  font-size: 17px;
  line-height: 45px;
  color: #fff;
}
</style>
