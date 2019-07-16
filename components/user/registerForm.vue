<template>
  <el-form :model="registerForm" ref="registerForm" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="registerForm.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="registerForm.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPass">
      <el-input placeholder="确认密码" type="password" v-model="registerForm.checkPass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 规则里判断的函数
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      registerForm: {
        username: "13794092524",
        captcha: "",
        nickname: "",
        password: "",
        checkPass: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        //验证第二次密码是否为空和是否与第一次一样
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //先判断是否有验证码
      const phoneNum = this.registerForm.username;
      console.log(phoneNum);
      if (!phoneNum.trim()) {
        this.$message.warning("请输入手机号");
        return;
      }
      //发送接口
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: phoneNum
        }
      }).then(res => {
        if (res.status === 200) {
            const {code} = res.data
          // this.$message.success(`您的验证码为${res.data.code}，请注意查收`)
          this.$alert(`您的验证码是${code}`,'提示', {
            confirmButtonText: "确定",
            type:'warning'
          });
        } else {
          return false;
        }
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.$refs.registerForm.validate);
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          //除了checkPass以外的所有属性
          const {checkPass,...props} = this.registerForm
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data:props
          }).then(res => {
            console.log(res);
            //把数据存到VUEX 
            this.$store.commit('user/userInfo',res.data)
            //返回上一页
            this.$router.back();
          });
        }else{
            console.log('错误');
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>