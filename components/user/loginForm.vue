<template>
  <el-form :model="Form" :rules="rules" ref="Form" class="demo-Form">
    <el-form-item prop="username" class="input">
      <el-input type="text" v-model="Form.username" placeholder="用户名 / 手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="input">
      <el-input type="password" v-model="Form.password" placeholder="密码"></el-input>
    </el-form-item>
    <p>
      <nuxt-link to="/" class="forget">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" class="button">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      Form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.demo-Form {
  width: 350px;
  // height: 232px;
  background-color: #fff;
  .input {
    padding: 20px 20px 0;
    width: 350px;
    margin: 0;
  }
  .button {
    width: 350px;
    margin:  15px 20px 0;
  }
  p {
    text-align: right;
    width: 350px;
    .forget {
      padding: 20px 20px 0;
      display: block;
      color: #409eff;
    }
  }
}
</style>

