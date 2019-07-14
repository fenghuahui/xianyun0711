<template>
  <div class="header">
    <el-row class="main" type="flex" justify='space-between'>
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 中间导航栏 -->
      <el-row class="nav" type='flex'>
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 右边登陆栏 -->
      <div class="right">
        <el-row class="login"  type='flex'>
          <!-- 下拉栏 -->
          <!-- <div>
            <i class="el-icon-clock"></i>
            <span>消息</span>
          </div> -->
          <!-- 登陆栏 -->
          <nuxt-link to="/user/login1">登陆 / 注册</nuxt-link>
        </el-row>
        <!-- 隐藏栏 -->
        <div v-show="false">

        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  line-height: 60px;

  .main {
    // line-height: 60px;
    width: 1000px;
    margin: 0 auto;
    .logo {
      img {
        width: 156px;
        height: 42px;
        margin-top: 9px;
      }
    }
  }
  .nav{
    // line-height: 60px;
    flex: 1;
    height: 60px;
    a{
      display: block;
      padding: 0 20px;
      &:hover{
        border-bottom: 3px solid #409eff;
        color: #409eff;
      }
    }
    .nuxt-link-exact-active{
      background-color: #409eff;
      color: #fff;
      &:hover{
        color: #fff;
      }
    }
  }
  .right{
    .login{
      a{
        margin-left: 10px;
        &:hover{
          color: #409eff;
        }
      }
    }
  }
}
</style>
