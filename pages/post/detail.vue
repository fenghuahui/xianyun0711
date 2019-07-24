<template>
  <el-row type="flex" class="detail">
    <el-col class="mian" :span="17">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" style="padding-top:20px">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 文章内容 -->
      <detailArticle/>
      <!-- 文章书写评论 -->
      <detailComment/>
      <!-- 文章评论 /分页-->
    </el-col>
    <!-- 文章右侧 -->
    <el-col :span="7">
      <detailAside/>
    </el-col>
  </el-row>
</template>

<script>
import detailArticle from '@/components/post/detailArticle'
import detailAside from '@/components/post/detailAside'
import detailComment from '@/components/post/detailComment'
export default {
  components:{
    detailArticle,
    detailAside,
    detailComment
  }
};
</script>

<style lang="less" scoped>
.detail{
  width: 1000px;
  margin: 0 auto;
  .mian{
    img{
      width: 100%;
    }
  }
}
</style>

