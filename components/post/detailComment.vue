<template>
  <div class="commemt">
    <h3>评论</h3>
    <!-- 文本框 -->
    <el-input
      class="textarea"
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="addFrom.content"
      style="margin-bottom:20px;"
      resize="none"
    ></el-input>
    <!-- 提交按钮 -->
    <el-button type="primary" style="margin-bottom:20px;float:right;" @click="submitToPost">提交</el-button>
    <!-- 图片上传 -->
    <el-upload
      action="http:127.0.0.1:1337/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      class="upload"
      style="margin-bottom:20px;"
      :on-success="handlesuccess"
      
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
    <!-- 评价列表 -->
    <div class="commentList">
      <!-- 评价 -->
      <div class="commetText" v-show="commentList.length !== 0 ">
        <div
          v-for="(item,index) in commentList"
          :key="index"
          style="border-bottom: 1px dashed #c0c4cc;"
        >
          <el-row type="flex" class="nickName" style="padding:10px;" justify="space-between">
            <div>
              <img
                style="width:20px;hight:16px;margin-right:10px;vertical-align: top;"
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar "
              />
              <span style="color:#666;margin-right:10px;">{{item.account.nickname}}</span>
              <span style="color:#666;">2019-01-01 12:00</span>
            </div>
            <span class="level">{{item.level}}</span>
          </el-row>
          <div
            v-show="item.pics.length !== 0"
            style="width:100px;height:100px; border: 1px dashed #c0c4cc;"
          >
            <div style="width:80px;height:80px;">{{item.pics}}</div>
          </div>
          <!-- 递归组件 -->
          <div class="detailItem">
            <detailItem :data="item.parent" v-if="item.parent !== undefined" />
          </div>
          <div style="margin:20px 0;">{{item.content}}</div>
          <!-- <nuxt-link to="javascript:;">回复</nuxt-link> -->
        </div>
      </div>
      <div v-show="commentList.length === 0 " class="hide">暂无评论，赶紧抢占沙发！</div>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import detailItem from "@/components/post/detailItem";
// import { fn } from 'moment';
export default {
  components: {
    detailItem
  },
  data() {
    return {
      dialogVisible: false, //
      dialogImageUrl: "",   //图片路径
      commentList: [],      //评论
      pageIndex: 0,         //默认页数
      pageSize: 4,          //每页默认条数
      total: 0,             //默认总条数
      addFrom: {
        content: "",        //评论内容
        pics: [],           //图片
        post: 4             //文章id
      }
    };
  },
  methods: {
    //提交评论
    submitToPost() {
      console.log(this.addFrom);
      this.$axios({
        url: "/comments",
        method: "POST",
        headers: {
          // token规范来自于JWT
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.addFrom
      }).then(res => {
        console.log(res);
        if(res.data.status === 0){
          this.content = res.data.content
          //弹框
          this.$message.warning(res.data.message)
          //刷新
          this.init()
        }
      });
    },
    //分页
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 0;
      this.init();
    },
    handleCurrentChange(value) {
      this.pageIndex = (value - 1) * this.pageSize;
      this.init();
    },
    // 点击已上传的文件链接时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList){
      console.log(response);
      this.addFrom.pics.push(response[0])
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {},
    //获取评论的钩子
    init() {
      const id = this.$route.query.id;
      this.$axios({
        url: "/posts/comments",
        params: {
          post: id, //文章id
          _start: this.pageIndex, //第几页
          _limit: this.pageSize //每页条数
        }
      }).then(res => {
        console.log(res);
        this.commentList = res.data.data;
        //获取总条数
        this.total = res.data.total;
      });
    }
  },
  mounted() {
    //请求评论列表
    this.init();
  }
};
</script>

<style lang="less" scoped>
.commemt {
  //评论列表
  .commetText {
    border: 1px solid #c0c4cc;
    margin-bottom: 10px;
    padding: 20px;
    .detailItem {
      detailItem {
        margin-left: 20px;
      }
      // border:1px dashed #c0c4cc;
      background-color: #eee;
    }
  }

  // 隐藏
  .hide {
    border: 1px dashed #c0c4cc;
    border-radius: 5px;
    padding: 20px 0;
    text-align: center;
    margin-bottom: 10px;
    color: #666;
  }
  h3 {
    font-weight: normal;
    padding-bottom: 20px;
  }
}
</style>

