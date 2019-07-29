<template>
  <div class="aside">
    <h3>相关攻略</h3>
    <!-- 列表 -->
    <!-- <div @click="handleToArticle(item.id)"> -->
    <el-row type="flex" class="list" v-for="(item,index) in recommendList" :key="index">
      <div class="listMin" @click="handleToArticle(item.id)">
        <el-row type="flex">
          <div>
            <img :src="item.images[0]" />
          </div>
          <div>
            <div>{{item.title}}</div>
            <span class="listTime">2019-01-01 12:00 阅读:{{item.watch}}</span>
          </div>
        </el-row>
      </div>
    </el-row>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:5 ,
      recommendList: []
    };
  },
  computed: {
    handleToArticle(index) {
      console.log(123);
      this.$router.push({
        // post/detail?id=4
        path: "/post/detail" + "?id=" + index
      });
    }
  },
  methods: {
    // handleToArticle(index) {
    //   console.log(123);
    //   this.$router.push({
    //     // post/detail?id=4
    //     path: "/post/detail" + "?id=" + index
    //   });
    // }
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log(res.data);
      this.recommendList = res.data.data;
    });

    // console.log(this.$route.query.id);
  }
};
</script>

<style lang="less" scoped>
.aside {
  margin-left: 20px;
  h3 {
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
  }
  .list {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    img {
      width: 100px;
      height: 80px;
      margin-right: 10px;
    }
    .listMin {
      // el-row {
      div {
        height: 80px;
        &:nth-child(2) {
          div {
            height: 60px;
            font-size: 16px;
          }
          .listTime {
            color: #ccc;
            align-content: bottom;
            font-size: 14px;
          }
        }
      }
      // }
    }
  }
}
</style>

