<template>
  <div class="detailItem">
    <div style="border:1px solid #c0c4cc;padding: 5px;">
      <detailItem v-if="data.parent" :data='data.parent'/>
      <el-row type="flex" class="nickName" style="padding:10px;" justify="space-between">
        <div>
          <span style="color:#666;">{{data.account.nickname}}</span>
          <span style="color:#666;">2019-01-01 12:00</span>
        </div>
        <span class="level">{{data.level}}</span>
      </el-row>
      <div
        v-show="data.pics.length !== 0"
        style="width:100px;height:100px; border: 1px dashed #c0c4cc;"
      >
        <div style="width:80px;height:80px;">{{data.pics}}</div>
      </div>
      <div style="margin-bottom:20px;margin-left:20px;padding-bottom: 10px;">{{data.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailItem",
  props: {
    data:{
      type:Object,
      default: {
        // parent: {
        //     // account:{}
        // }
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>

