<template>
  <div>
    <!-- 头部 -->
    <Header/>
    <!-- 主页 -->
    <nuxt />
    <!-- 尾部 -->
    <Footer/>
  </div>
</template>
<script>
import Footer from '@/components/footer'
import Header from '@/components/header'
export default {
  //注入组建
  components:{
    Footer,
    Header
  }
}
</script>

<style  scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
/* 去掉默认值 */
*{
  margin: 0;
  padding: 0;
}
/* 去掉a默认下划线,和颜色 */
a{
  text-decoration: none;
  color: inherit;
}
/* 标签默认斜体 */
em,i{
  font-style: normal;
}
ul,li,ol{
 list-style: none;
}
</style>
