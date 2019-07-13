<template>
  <div class="header">   
    <el-row class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 中间导航栏 -->
      <div class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </div>
      <!-- 右边登陆栏 -->
      <div class="right">
        <div class="login">
          <!-- 下拉栏 -->
          <!-- 登陆栏 -->
          <nuxt-link to="/login">登陆 / 注册</nuxt-link>
        </div>
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
  width: 1000px;
  margin: 0 auto;
}
</style>
