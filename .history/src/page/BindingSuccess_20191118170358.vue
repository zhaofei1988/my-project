<template>
  <div>
    <div class="icon-success">
      <i class="icon iconfont iconmatch-success"></i>
    </div>
    <div class="success-div">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "BindingSuccess",
  data() {
    return {
      text: ""
    };
  },

  created() {
    if (this.$route.query.type == 1) {
      this.text = "恭喜绑定成功";
    } else {
      storage.removeItem("henglianPhong");
      this.text = "解除绑定成功";
    }
  },

  mounted() {},

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.icon-success {
  text-align: center;
  margin-top: 110px;
  i {
    color: #00f888;
    font-size: 70px;
  }
}
.success-div {
  margin-top: 30px;
  font-size: 30px;
  text-align: center;
}
</style>
