<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- <FlightsListHead/> -->
        <FlightsFilters :data='cacheFlightsData' @changeFlights = 'changeFlights'/>
        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(data,index) in dataList" :key="index" :data="data" />
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 分页 -->

      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/FlightsListHead";
import FlightsItem from "@/components/air/FlightsItem";
import FlightsFilters from "@/components/air/FlightsFilters";
import FlightsAside from "@/components/air/FlightsAside";
export default {
  components: {
    FlightsItem,
    FlightsListHead,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      //总数据
      flightsList: {
        flights:[],
        info:{},
        options:{}
      },
      //总数据缓存，赋值就不会变
      cacheFlightsData:{
        flights:[],
        info:{},
        options:{}
      },
      //分页
      pageSize:5,
      pageIndex:1,
      total:0
    };
  },
  computed: {
    dataList(){
      //slice（从什么时候开始，到什么结束-1）

      return this.flightsList.flights.slice(
        (this.pageIndex-1)*this.pageSize,
        this.pageIndex*this.pageSize
      )
    }
  },
  methods: {
    getAirList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        //总数据
        this.flightsList = res.data;
        console.log(res);
        //不会变的总数据
        this.cacheFlightsData = {...res.data}
        //设置总条数
        this.total = this.flightsList.flights.length
      });
    },
    // 给子组件传递用于修改过滤事件
    changeFlights(arr){
      this.flightsList.flights = arr
      this.pageIndex = 1
      //总条数
       this.total = this.flightsList.flights.length
    },
    // 每页条数
    handleSizeChange(value){
      this.pageSize = value
      //刷新后页面=1
      this.pageIndex = 1
      
    },
    //第几页
    handleCurrentChange(value){
      this.pageIndex = value
    }
  },
  mounted() {
    this.getAirList();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
