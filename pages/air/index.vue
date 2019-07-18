<template>
  <div class="air">
    <!-- 国内机票 -->
    <el-row class="head">
      <i class="iconfont iconfeiji"></i>
      <span>国内机票</span>
    </el-row>
    <!-- 查询表单模块 -->
    <seachForm/>
  </div>
</template>

<script>
import seachForm from '@/components/air/seachForm'
export default {
  components: {
    seachForm
  }
}
</script>

<style lang="less" scoped>
.air{
  width: 1000px;
  margin: 0 auto;
  .head{
    color:orange;
    padding: 15px 0;
  }
}


</style>

