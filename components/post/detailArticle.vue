<template>
  <div class="mian">
    <h1>{{postDetail.title}}</h1>
    <!-- <hr/> -->
    <el-row type="flex" class="readNum">
      <span>发布时间:{{postDetail.city.created_at}}</span>
      &nbsp;&nbsp;&nbsp;
      <span>阅读：{{postDetail.watch}}</span>
    </el-row>
    <!-- 内容 -->
    <div class="content" v-html="postDetail.content"></div>
    <!-- 收藏 -->
    <el-row type="flex" class="tool el-row is-justify-center el-row--flex">
      <div class="comment">
        <i class="iconfont iconpinglun"></i>
        <p>评论（{{postDetail.comments.length}}）</p>
      </div>
      <div class="collect" @click="likeTotal('收藏')">
        <i class="iconfont iconstar1"></i>
        <p>收藏</p>
      </div>
      <div class="share">
        <i class="iconfont iconfenxiang"></i>
        <p>分享</p>
      </div>
      <div class="like" @click="likeTotal('点赞')">
        <i class="iconfont iconding"></i>
        <p>点赞（{{postDetail.like}}）</p>
      </div>
    </el-row>
  </div>
</template>

<script>
import { moment } from 'moment';
export default {
  data() {
    return {
      id: 4,
      postDetail: {
        city: "",
        comments:''
      }
    };
  },
  methods: {
    //时间
     handleDate(value){
      this.form.departDate =  moment(value).format("YYYY-MM-DD");
     },
    //请求文章内容钩子
    postsContent(){
      this.$axios({
        url: "posts",
        params: {
          id: this.id
        }
      }).then(res => {
        this.postDetail = res.data.data[0];
        console.log(this.postDetail);
      });
    },
    // 获得点赞数的钩子
    likeTotal(a){
      // this.$axios({
      //   url:'/posts/like',
      //   params:{
      //     id:this.id
      //   },
      //   headers:{
      //     Authorization: `Bearer ${ this.$store.state.user.userInfo.token }`
      //   }
      // }).then((res)=>{
      //   console.log(res);
      // })
      this.$alert(`暂未支持${a}功能`,'提示',{
        confirmButtonText: "确定",
        type: "warning"
      })
    }
  },
  mounted() {
    // 请求文章详情接口
     this.postsContent() 
     //请求文章点赞的接口
    //  this.likeTotal()
  }
};
</script>

<style lang="less" scoped>
.mian {
  .tool {
    padding: 50px 0 30px 0;
    // text-align: center;
    // margin: 0 auto;
    font-size: 14px;
    color: #666;
    > div {
      padding: 0 20px;
      height: 58px;
      // line-height: 58px;
      text-align: center;
      i {
        color: orange;
        font-size: 28px;
        margin-bottom: 8px;
      }
    }
  }
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }
  .readNum {
    color: #666;
    padding: 20px 0;
    // float: right;
    // margin: 20px 0;
  }
  .content {
    // padding-top: 20px;
    /deep/ p {
      span {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

