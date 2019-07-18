<template>
  <div class="air">
    <!-- 国内机票 -->
    <el-row class="head" type="flex">
      <i class="iconfont iconfeiji"></i>
      <span>国内机票</span>
    </el-row>
    <el-row type="flex" justify="space-between">
      <!-- 查询表单模块 -->
      <seachForm />
      <!-- 右边广告图 -->
      <div>
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>
    <!-- 服务热线 -->
    <el-row type="flex" class="statement">
      <el-col :span="8" class="col-el">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="col-el">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8" class="col-el">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 特价机票 -->
    <el-row class="air-sale-title" type="flex">
      <i class="iconfont icontejiajipiao"></i>
      <span>特价机票</span>
    </el-row>
    <!-- 特价机票列表 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item, index) in sales" :key="index">
          <nuxt-link
            :to="`/airs/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
               <!-- 价格保留两位小数 -->
              <span>￥ {{ Number(item.price).toFixed(2) }}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import seachForm from "@/components/air/seachForm";
// import moment, { fn } from 'moment';
export default {
  components: {
    seachForm
  },
  data() {
    return {
      sales:[]
    };
  },
  methods: {
    
  },
  mounted () {
    //请求特价机票，因为是不需要点击方法触发的，所以放置在自动触发钩子中
    this.$axios({
      url:'/airs/sale'
    }).then(res=>{
      const {data}=res.data
      this.sales = data
    })
  }
};
</script>

<style lang="less" scoped>
.air {
  width: 1000px;
  margin: 0 auto;
  .air-sale {
    border: 1px #ddd solid;
    padding: 20px;
    margin-bottom: 50px;

    .air-sale-pic {
      > div {
        width: 225px;
        height: 140px;
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
        }

        .layer-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          height: 30px;
          line-height: 30px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 15px;
          font-size: 14px;

          span:last-child {
            font-size: 18px;
          }
        }
      }
    }
  }
  .head {
    color: orange;
    padding: 15px 0;
    font-size: 20px;
    .iconfont {
      font-size: 25px;
    }
  }
  .air-sale-title {
    color: #409eff;
    padding: 15px 0;
    font-size: 20px;
    .iconfont {
      font-size: 25px;
    }
  }
  .statement {
    margin-top: 20px;
    height: 58px;
    // line-height: 36px;
    // padding: 10px 0;
    // text-align: center;
    background-color: #f5f5f5;
    border: 1px solid #dedede;
    .col-el {
      height: 36px;
      line-height: 36px;
      padding: 10px 0;
      text-align: center;
      //  border-left: 1px solid #dedede;
    }
  }
}
</style>

