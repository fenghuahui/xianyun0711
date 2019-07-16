<template>
  <el-form :model="form" :rules="rules" ref="form" class="demo-Form">
    <el-form-item prop="username" class="input">
      <el-input type="text" v-model="form.username" placeholder="用户名 / 手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="input">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <p>
      <nuxt-link to="/" class="forget">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" class="button" @click="submitLogin">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
  },
  methods: {
    submitLogin(){
      //验证表单数据
      this.$refs.form.validate((valid)=>{
        if(valid){
          this.$store.dispatch('user/login',this.form)
          .then((res)=>{
            //成功就提示跳转
            this.$message.success('登陆成功，正在跳转')
            //使用定时器延迟时间跳转回上一页
            setTimeout(()=>{
              // 跳转回上一页
              this.$router.back()
            },1500)
          })
          .catch((err)=>{console.log(err);})
        }
      })
    }
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
      // width: 30px;
    }
  }
}
</style>

