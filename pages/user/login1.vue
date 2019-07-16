<template>
  <div class="mian">
    <!-- 登陆注册tab栏 -->
    <div class="login">
      <el-row class="tabs" type="flex">
        <span
          v-for="(tab,index) in [`登陆`,`注册`]"
          :key="index"
          :class="{active:current===index}"
          @click="handleChangTab(index)"
        >{{tab}}</span>
      </el-row>
      <!-- 登陆表单导入 -->
      <loginForm v-if="current === 0" class="loginForm" />
      <registerForm v-if="current === 1" class="registerForm" />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm";
import registerForm from "@/components/user/registerForm";
export default {
  data() {
    return {
      current: 0
    };
  },
  components: {
    LoginForm,
    registerForm
  },
  methods: {
    handleChangTab(index) {
      this.current = index;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.mian {
  height: 800px;
  width: 100%;
  // position: relative;
  background: url(http://157.122.54.189:9095/assets/images/th02.jfif) center 0;
  // background: url('@/assets/img/1.jpg') center 0;
  .login {
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -200px;
    // justify-content: center;
    width: 400px;
    .loginForm {
      background-color: #fff;
      height: 232px;
      width: 400px;
    }
    .registerForm{
      background-color: #fff;
      height: 350px;
      width: 350px;
    }
    .tabs {
      height: 50px;
      line-height: 50px;
      width: 400px;
      background-color: #fff;
      span {
        width: 200px;
        text-align: center;
        display: block;
        color: #333;
        background-color: #eeeeee;
      }
      .active {
        color: orange;
        border-top: 2px solid orange;
        font-weight: 600;
        background-color: #fff;
      }
    }
  }
}
</style>



