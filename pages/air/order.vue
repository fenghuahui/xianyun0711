<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderForm />

      <!-- 侧边栏 -->
      <orderAside :data="infoData" />
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside";
export default {
  components: {
    orderForm,
    orderAside
  },
  data() {
    return {
      infoData: {
        seat_infos: {}
      }
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>