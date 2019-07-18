<template>
  <div class="seach">
    <!-- 搜索tab -->
    <el-row class="tabs" type="flex">
      <span
        v-for="(tab,index) in tabs"
        :key="index"
        :class="{active:current===index}"
        @click="handleChangTab(index)"
      >
        <i :class="tab.icon"></i>
        {{tab.name}}
      </span>
    </el-row>
    <!-- 表单 -->
    <el-form :model="form" class="seach-Form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          placeholder="请搜索出发城市"
          @select="handleSelect"
          :fetch-suggestions="queryDepSearchAsync"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          :fetch-suggestions="queryDesSearchAsync"
          @select="handleDes"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.departDate"
            @change="handleDate"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:213px" class="el-icon-search" @click="searchSubmitCity">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 换 -->
    <i class="el-icon-d-caret chuangIcon" @click="chuangIcon"></i>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      current: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "返程" }
      ],
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    handleChangTab(index) {
      if (index === 1) {
        this.$alert("暂时没有往返", "提示", {
          type: "warning"
        });
      }
      // this.current = 0;
    },
    //选择时改变
    handleSelect() {},
    //有值的时候匹配相对性值
    //value  输入框的值
    // 选择出发城市
    queryDepSearchAsync(value, cd) {
      if (!value) return;
      //如果有值就发送请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        //  console.log(res);
        const { data } = res.data;
        // console.log(data);
        //给数组中的对象添加value·
        const newData = data.map(v => {
          //  replace() 第一个值替换成第二个值
          v.value = v.name.replace("市", "");
          return v;
        });
        //  console.log(newData[0].sort);
        //默认选中第一个
        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;
        cd(newData);
      });
    },
    //选择到达城市
    queryDesSearchAsync(value, cd) {
      if (!value) return;
      //如果有值就发送请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        //  console.log(res);
        const { data } = res.data;
        //  console.log(data);
        //给数组中的对象添加value·
        const newData = data.map(v => {
          //  replace() 第一个值替换成第二个值
          v.value = v.name.replace("市", "");
          return v;
        });
        //  console.log(newData[0].sort);
        //默认选中第一个
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;
        cd(newData);
      });
    },
    //点击交换城市
    chuangIcon() {
      //解构出需要用到的参数
      const { departCity, departCode, destCity, destCode } = this.form;
      //点击的时候把form本来的值替换一下
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCode = departCode;
      this.form.destCity = departCity;
    },
    //选择日期的时候发生改变  转换成为2019-7-17格式
    handleDate(value) {
      this.form.departDate = moment(value).format('YYYY-MM-DD')
    },
    //赋值
    handleDes(itme){},
    //点击搜索
    searchSubmitCity() {
      console.log(this.form);
      // this.form
      //设置验证方式
      const rules = {
        departCity:{
          value:this.form.departCity,
          message:'请输入出发城市'
        },
        destCity:{
          value:this.form.destCity,
          message:'请输入出发城市'
        },
        departDate:{
          value:this.form.departDate,
          message:'请输入出发时间'
        }
      }
      //设置默认属性方便下面做判断
      let valid = true;
      //循环上面的字段是否为空
      Object.keys(rules).forEach((v)=>{
        //判断只要有一次为空，就不执行
        if(!valid) return

        //判断字段的值为空
        if(!rules[v].value){
          valid = false;
          this.$message.warning(rules[v].message) 
        }
      })
      //如果valid = trun 那么跳转
      if(valid){
        this.$router.push({
          path:'/airs/flights',
          query:this.form
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.seach {
  border: 1px solid #eee;
  width: 360px;
  height: 350px;
  // margin-bottom: 100px;
  position: relative;
  .chuangIcon {
    position: absolute;
    right: 158px;
    top: 110px;
    color: #666;
  }
  .tabs {
    span {
      width: 180px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background-color: #eee;
    }
    .active {
      background-color: #fff;
      border-top: 3px solid orange;
    }
  }
  .seach-Form {
    padding: 15px 50px 15px 15px;
    width: 293px;
    height: 248px;
    .el-input {
      width: 213px;
    }
  }
}
</style>

