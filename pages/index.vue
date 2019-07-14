<template>
  <div class="mian">
    <!-- 幻灯片 -->
    <el-carousel height="700px" :interval="5000" arrow="always">
      <el-carousel-item v-for="(pics,index) in banners" :key="index">
        <span :style="`background:url(${$axios.defaults.baseURL+ pics.url})`" class="banner-img"></span>
      </el-carousel-item>
    </el-carousel>
    <!-- tab栏 -->
    <div class="search">
      <el-row type="flex" class="tab">
        <span v-for="(item,index) in tabs" :key="index" 
        @click="tabsChuang(index)"
        :class="{active:currentTab === index}"
        >
          <i>{{item.title}}</i>
        </span>
      </el-row>
      <!-- 搜索框 -->
      <el-row type="flex" class="search-input">
        <el-input type="text" :placeholder="tabs[currentTab].placeholder">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "攻略", placeholder: "请输入城市" },
        { title: "酒店", placeholder: "请输入城市搜索酒店" },
        { title: "机票", placeholder: "" }
      ],
      banners: [],
      //设置tab栏变量
      currentTab:0
    };
  },
  methods: {
    tabsChuang(index) {
      if(index===2){
        this.$router.push('/air')
      }
      this.currentTab = index
    }
  },
  mounted() {
    //请求轮播图接口
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        const { data } = res.data;
        this.banners = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.mian {
  height: 700px;
  position: relative;
  .banner-img {
    display: block;
    height: 100%;
  }

  .search {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    .tab {
      span {
        height: 36px;
        line-height: 36px;
        margin-right: 2px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        i {
          padding: 0 15px;
          height: 100%;
          color: #fff;
        }
      }
      .active{
        background-color: #eee;
        i {
          color: #333;
        }
      }
    }
    .search-input {
      width: 400px;
      border: none;
      .el-input__inner {
        outline: none;
      }
    }
  }
}
</style>


