<template>
  <div>
    <div>
      <div class="input1">
        <input type="tel" placeholder="输入手机号" maxlength="11"  v-model="mobiles" />
      </div>
      <div class="input2">
        <input type="text" maxlength="6" placeholder="请输入验证码" v-model="code" />
        <div @click="sendCode">{{codeText}}</div>
      </div>
      <div class="button" @click="relieveBingding">解除绑定</div>
    </div>
  </div>
</template>

<script>
import httpcc from "../https.js";
import { MessageBox } from "mint-ui";
export default {
  name: "Unbind",
  data() {
    return {
      mobiles: "",
      code: "",
      codeText: "发送验证码",
      codeM: 60,
      cilck: true
    };
  },

  created() {
     if (window.localStorage && window.localStorage.henglianPhong) {
         this.mobiles=window.localStorage.henglianPhong
    }
  },

  mounted() {},

  methods: {
    sendCode() {
      if (this.mobiles == "") {
        MessageBox.alert("手机号不能为空", "提示");
        return false;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobiles)) {
        MessageBox.alert("手机号码有误，请检查输入的手机号", "提示");
        return false;
      }
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
      var jobj = { phone: this.mobiles };
      httpcc
        .fetchPost("/Weixin/SendSmsServlet", jobj)
        .then(data => {
          MessageBox.alert(data.message, "提示");
        })
        .catch(error => {
          MessageBox.alert(error, "提示");
        });
    },
    relieveBingding() {
      this.http(2);
    },
    http(types) {
      if (this.mobiles == "") {
        MessageBox.alert("手机号不能为空", "提示");
        return false;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobiles)) {
        MessageBox.alert("手机号码有误，请检查输入的手机号", "提示");
        return false;
      }
      if (this.code == "") {
        MessageBox.alert("验证码不能为空", "提示");
        return false;
      }
      var jobj = {
        mobile: this.mobiles,
        openid: this.id,
        type: types,
        code: this.code
      };
      httpcc
        .fetchPost("/Weixin/BindingServlet", jobj)
        .then(data => {
          if (data.code == 2) {
            MessageBox.alert(
              "你的手机号没有备注，请联系相关人员进行备注",
              "提示"
            );
          } else if (data.code == 1) {
            this.$router.push({
              path: "/BindingSuccess",
              query: { type: types }
            });
          } else {
            MessageBox.alert(data.message, "提示");
          }
        })
        .catch(error => {
          MessageBox.alert(error, "提示");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.input1 {
  margin: auto;
  margin-top: 100px;
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
